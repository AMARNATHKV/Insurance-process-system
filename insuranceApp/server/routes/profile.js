let profile = {

    insurer: {
        "cryptoPath": "../../insurance-network/organizations/peerOrganizations/insurer.insurance.com", 
		"keyDirectoryPath": "../../insurance-network/organizations/peerOrganizations/insurer.insurance.com/users/User1@insurer.insurance.com/msp/keystore/",
        "certPath":     "../../insurance-network/organizations/peerOrganizations/insurer.insurance.com/users/User1@insurer.insurance.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../insurance-network/organizations/peerOrganizations/insurer.insurance.com/peers/peer0.insurer.insurance.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.insurer.insurance.com",
        "mspId": "insurerMSP"
    },


    healthcareProvider: {
        "cryptoPath": "../../insurance-network/organizations/peerOrganizations/healthcareProvider.insurance.com", 
		"keyDirectoryPath": "../../insurance-network/organizations/peerOrganizations/healthcareProvider.insurance.com/users/User1@healthcareProvider.insurance.com/msp/keystore/",
        "certPath":     "../../insurance-network/organizations/peerOrganizations/healthcareProvider.insurance.com/users/User1@healthcareProvider.insurance.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../insurance-network/organizations/peerOrganizations/healthcareProvider.insurance.com/peers/peer0.healthcareProvider.insurance.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.healthcareProvider.insurance.com",
        "mspId": "healthcareProviderMSP"
    },

   
    TPA: {
        "cryptoPath": "../../insurance-network/organizations/peerOrganizations/TPA.insurance.com", 
		"keyDirectoryPath": "../../insurance-network/organizations/peerOrganizations/TPA.insurance.com/users/User1@TPA.insurance.com/msp/keystore/",
        "certPath":     "../../insurance-network/organizations/peerOrganizations/TPA.insurance.com/users/User1@TPA.insurance.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../insurance-network/organizations/peerOrganizations/TPA.insurance.com/peers/peer0.TPA.insurance.com/tls/ca.crt",
		"peerEndpoint": "localhost:8051",
		"peerHostAlias":  "peer0.TPA.insurance.com",
        "mspId": "TPAMSP"
    },
    regulatoryAuthority: {
        "cryptoPath": "../../insurance-network/organizations/peerOrganizations/regulatoryAuthority.insurance.com", 
		"keyDirectoryPath": "../../insurance-network/organizations/peerOrganizations/regulatoryAuthority.insurance.com/users/User1@regulatoryAuthority.insurance.com/msp/keystore/",
        "certPath":     "../../insurance-network/organizations/peerOrganizations/regulatoryAuthority.insurance.com/users/User1@regulatoryAuthority.insurance.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../insurance-network/organizations/peerOrganizations/regulatoryAuthority.insurance.com/peers/peer0.regulatoryAuthority.insurance.com/tls/ca.crt",
		"peerEndpoint": "localhost:11051",
		"peerHostAlias":  "peer0.regulatoryAuthority.insurance.com",
        "mspId": "regulatoryAuthorityMSP"
    }
}
module.exports = { profile }