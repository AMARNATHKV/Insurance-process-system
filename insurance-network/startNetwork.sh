#!/bin/bash

echo "------------Register the ca admin for each organization—----------------"

docker compose -f docker/docker-compose-ca.yaml up -d
sleep 3
sudo chmod -R 777 organizations/

echo "------------Register and enroll the users for each organization—-----------"

chmod +x registerEnroll.sh

./registerEnroll.sh
sleep 3

echo "—-------------Build the infrastructure—-----------------"

docker compose -f docker/docker-compose-4org.yaml up -d
sleep 3

echo "-------------Generate the genesis block—-------------------------------"

export FABRIC_CFG_PATH=${PWD}/config

export CHANNEL_NAME=insurancechannel
echo "###########################################################"
echo ${CHANNEL_NAME}

configtxgen -profile ChannelUsingRaft -outputBlock ${PWD}/channel-artifacts/${CHANNEL_NAME}.block -channelID $CHANNEL_NAME

echo "------ Create the application channel------"

export ORDERER_CA=${PWD}/organizations/ordererOrganizations/insurance.com/orderers/orderer.insurance.com/msp/tlscacerts/tlsca.insurance.com-cert.pem

export ORDERER_ADMIN_TLS_SIGN_CERT=${PWD}/organizations/ordererOrganizations/insurance.com/orderers/orderer.insurance.com/tls/server.crt

export ORDERER_ADMIN_TLS_PRIVATE_KEY=${PWD}/organizations/ordererOrganizations/insurance.com/orderers/orderer.insurance.com/tls/server.key

osnadmin channel join --channelID $CHANNEL_NAME --config-block ${PWD}/channel-artifacts/$CHANNEL_NAME.block -o localhost:7053 --ca-file $ORDERER_CA --client-cert $ORDERER_ADMIN_TLS_SIGN_CERT --client-key $ORDERER_ADMIN_TLS_PRIVATE_KEY
sleep 2
osnadmin channel list -o localhost:7053 --ca-file $ORDERER_CA --client-cert $ORDERER_ADMIN_TLS_SIGN_CERT --client-key $ORDERER_ADMIN_TLS_PRIVATE_KEY
sleep 2

export FABRIC_CFG_PATH=${PWD}/peercfg
export insurer_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/insurer.insurance.com/peers/peer0.insurer.insurance.com/tls/ca.crt
export healthcareProvider_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/healthcareProvider.insurance.com/peers/peer0.healthcareProvider.insurance.com/tls/ca.crt
export TPA_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/TPA.insurance.com/peers/peer0.TPA.insurance.com/tls/ca.crt
export regulatoryAuthority_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/regulatoryAuthority.insurance.com/peers/peer0.regulatoryAuthority.insurance.com/tls/ca.crt

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID=healthcareProviderMSP
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/healthcareProvider.insurance.com/peers/peer0.healthcareProvider.insurance.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/healthcareProvider.insurance.com/users/Admin@healthcareProvider.insurance.com/msp
export CORE_PEER_ADDRESS=localhost:7051
sleep 2

echo "—---------------Join healthcareProvider peer to the channel—-------------"

echo ${FABRIC_CFG_PATH}
sleep 2
peer channel join -b ${PWD}/channel-artifacts/${CHANNEL_NAME}.block
sleep 3

echo "-----channel List----"
peer channel list

echo "—-------------healthcareProvider anchor peer update—-----------"


peer channel fetch config ${PWD}/channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
sleep 1

cd channel-artifacts

configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json

cp config.json config_copy.json

jq '.channel_group.groups.Application.groups.healthcareProviderMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.healthcareProvider.insurance.com","port": 7051}]},"version": "0"}}' config_copy.json > modified_config.json

configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb

configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb

cd ..

peer channel update -f ${PWD}/channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.insurance.com --tls --cafile $ORDERER_CA
sleep 1

echo "—---------------package chaincode—-------------"


# cp -r ../fabric-samples/asset-transfer-basic/chaincode-javascript ../Chaincode

# peer lifecycle chaincode package basic.tar.gz --path ../Chaincode/chaincode-javascript/ --lang node --label basic_1.0

peer lifecycle chaincode package insurance.tar.gz --path ${PWD}/../chaincode/Insurance-Chaincode --lang node --label insurance_1.0
sleep 1

export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid insurance.tar.gz)

echo "—---------------install chaincode in healthcareProvider peer—-------------"

peer lifecycle chaincode install insurance.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled

echo "—---------------Approve chaincode in healthcareProvider peer—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com --channelID $CHANNEL_NAME --name Insurance-Chaincode --version 1.0 --collections-config ../chaincode/Insurance-Chaincode/collections_config.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
sleep 2

#NEW
export CORE_PEER_LOCALMSPID=insurerMSP
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/insurer.insurance.com/peers/peer0.insurer.insurance.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/insurer.insurance.com/users/Admin@insurer.insurance.com/msp
export CORE_PEER_ADDRESS=localhost:5051
sleep 2

echo "—---------------Join insurer peer to the channel—-------------"

echo ${FABRIC_CFG_PATH}
sleep 2
peer channel join -b ${PWD}/channel-artifacts/${CHANNEL_NAME}.block
sleep 3

echo "-----channel List----"
peer channel list

echo "—-------------insurer anchor peer update—-----------"


peer channel fetch config ${PWD}/channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
sleep 1

cd channel-artifacts

configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json

cp config.json config_copy.json

jq '.channel_group.groups.Application.groups.insurerMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.insurer.insurance.com","port": 5051}]},"version": "0"}}' config_copy.json > modified_config.json

configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb

configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb

cd ..

peer channel update -f ${PWD}/channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.insurance.com --tls --cafile $ORDERER_CA
sleep 1

# END1
echo "—---------------install chaincode in insurer peer0—-------------"

peer lifecycle chaincode install insurance.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled

echo "—---------------Approve chaincode in insurer peer0—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com --channelID $CHANNEL_NAME --name Insurance-Chaincode --version 1.0 --collections-config ../chaincode/Insurance-Chaincode/collections_config.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
sleep 2
export CORE_PEER_LOCALMSPID=insurerMSP
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/insurer.insurance.com/peers/peer1.insurer.insurance.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/insurer.insurance.com/users/Admin@insurer.insurance.com/msp
export CORE_PEER_ADDRESS=localhost:4051
sleep 2

echo "—---------------Join insurer peer1 to the channel—-------------"

echo ${FABRIC_CFG_PATH}
sleep 2
peer channel join -b ${PWD}/channel-artifacts/${CHANNEL_NAME}.block
sleep 3

echo "-----channel List----"
peer channel list
#END2
echo "—---------------install chaincode in insurer peer1—-------------"

peer lifecycle chaincode install insurance.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled

echo "—---------------Approve chaincode in insurer peer1—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com --channelID $CHANNEL_NAME --name Insurance-Chaincode --version 1.0 --collections-config ../chaincode/Insurance-Chaincode/collections_config.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
sleep 2

export CORE_PEER_LOCALMSPID=TPAMSP 
export CORE_PEER_ADDRESS=localhost:9051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/TPA.insurance.com/peers/peer0.TPA.insurance.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/TPA.insurance.com/users/Admin@TPA.insurance.com/msp

echo "—---------------Join TPA peer to the channel—-------------"

peer channel join -b ${PWD}/channel-artifacts/$CHANNEL_NAME.block
sleep 1
peer channel list

echo "—-------------TPA anchor peer update—-----------"


peer channel fetch config ${PWD}/channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
sleep 1

cd channel-artifacts

configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json

cp config.json config_copy.json

jq '.channel_group.groups.Application.groups.TPAMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.TPA.insurance.com","port": 9051}]},"version": "0"}}' config_copy.json > modified_config.json

configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb

configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb

cd ..

peer channel update -f ${PWD}/channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.insurance.com --tls --cafile $ORDERER_CA
sleep 1
echo "—---------------install chaincode in TPA peer0—-------------"

peer lifecycle chaincode install insurance.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled

echo "—---------------Approve chaincode in TPA peer0—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com --channelID $CHANNEL_NAME --name Insurance-Chaincode --version 1.0 --collections-config ../chaincode/Insurance-Chaincode/collections_config.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
sleep 2



#new start
export CORE_PEER_LOCALMSPID=regulatoryAuthorityMSP 
export CORE_PEER_ADDRESS=localhost:6051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/regulatoryAuthority.insurance.com/peers/peer0.regulatoryAuthority.insurance.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/regulatoryAuthority.insurance.com/users/Admin@regulatoryAuthority.insurance.com/msp

echo "—---------------Join regulatoryAuthority peer to the channel—-------------"

peer channel join -b ${PWD}/channel-artifacts/$CHANNEL_NAME.block
sleep 1
peer channel list

echo "—-------------regulatoryAuthority anchor peer update—-----------"


peer channel fetch config ${PWD}/channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
sleep 1

cd channel-artifacts

configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json

cp config.json config_copy.json

jq '.channel_group.groups.Application.groups.regulatoryAuthorityMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.regulatoryAuthority.insurance.com","port": 6051}]},"version": "0"}}' config_copy.json > modified_config.json

configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb

configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb

cd ..

peer channel update -f ${PWD}/channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.insurance.com --tls --cafile $ORDERER_CA
sleep 1
#new end

echo "—---------------install chaincode in regulatoryAuthority peer0—-------------"

peer lifecycle chaincode install insurance.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled

echo "—---------------Approve chaincode in regulatoryAuthority peer0—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com --channelID $CHANNEL_NAME --name Insurance-Chaincode --version 1.0 --collections-config ../chaincode/Insurance-Chaincode/collections_config.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent
sleep 2


echo "—---------------Commit chaincode in regulatoryAuthority peer0—-------------"

peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name Insurance-Chaincode --version 1.0 --sequence 1 --collections-config ../chaincode/Insurance-Chaincode/collections_config.json --tls --cafile $ORDERER_CA --output json

peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.insurance.com --channelID $CHANNEL_NAME --name Insurance-Chaincode --version 1.0 --sequence 1 --collections-config ../chaincode/Insurance-Chaincode/collections_config.json --tls --cafile $ORDERER_CA --peerAddresses localhost:5051 --tlsRootCertFiles $insurer_PEER_TLSROOTCERT --peerAddresses localhost:7051 --tlsRootCertFiles $healthcareProvider_PEER_TLSROOTCERT --peerAddresses localhost:6051 --tlsRootCertFiles $regulatoryAuthority_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $TPA_PEER_TLSROOTCERT
sleep 1

peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name Insurance-Chaincode --cafile $ORDERER_CA
