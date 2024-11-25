const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

// Policy Routes

// Endpoint to create a new insurance policy
router.post("/createpolicy", async (req, res) => {
  try {
    const { policyId, policyHolder, premiumAmount, coverageAmount, startDate, endDate } = req.body;
    const insurerClient = new clientApplication();

    const result = await insurerClient.submitTxn(
      "insurer",
      "insurancechannel",
      "Insurance-Chaincode",
      "PolicyContract",
      "invokeTxn",
      "",
      "createPolicy",
      policyId,
      policyHolder,
      premiumAmount,
      coverageAmount,
      startDate,
      endDate
    );

    res.status(201).json({
      success: true,
      message: "Policy created successfully!",
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating policy. Please check the Policy details!",
      data: { error },
    });
  }
});


router.post("/readpolicy", async (req, res) => {
  try {
    const { policyId } = req.body;
    const insurerClient = new clientApplication();
    
    // Retrieve policy data
    const policyData = await insurerClient.submitTxn(
      "insurer",
      "insurancechannel",
      "Insurance-Chaincode",
      "PolicyContract",
      "queryTxn",
      "",
      "readPolicy",
      policyId
    );

    // Decode and parse the data
    const data = JSON.parse(new TextDecoder().decode(policyData));
    console.log('Retrieved Policy Data:', data); // Debugging line to check data

    res.status(200).json({
      success: true,
      message: "Policy data retrieved successfully!",
      data: data, // Ensure this is correct
    });
  } catch (error) {
    console.error('Error retrieving policy data:', error); // Log the error to debug
    res.status(500).json({
      success: false,
      message: "Please check the Policy ID!",
      data: error,
    });
  }
});


// Endpoint to delete a policy by policy ID
router.post("/deletepolicy", async (req, res) => {
  try {
    const { policyId } = req.body;
    const insurerClient = new clientApplication();

    await insurerClient.submitTxn(
      "insurer",
      "insurancechannel",
      "Insurance-Chaincode",
      "PolicyContract",
      "invokeTxn",
      "",
      "deletePolicy",
      policyId
    );

    res.status(200).json({
      success: true,
      message: "Policy deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting policy. Please check the Policy ID!",
      data: { error },
    });
  }
});


router.post("/submitMedicalReport", async (req, res) => {
  const { reportId, policyId, billAmount, diagnosis, description, date} = req.body;

  const userClient = new clientApplication();

  // Validate required fields
  if (!reportId || !policyId || !billAmount || !diagnosis || !description || !date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create transient data
    const transientData = {
      policyId: Buffer.from(policyId),
      billAmount: Buffer.from(billAmount.toString()),
      diagnosis: Buffer.from(diagnosis),
      description: Buffer.from(description),
      date: Buffer.from(date),
    
    };

    console.log("Transient Data:", transientData);

    // Submit transaction
    const result = await userClient.submitTxn(
      "healthcareProvider",          // MSP for healthcare provider
      "insurancechannel",              // Channel name
      "Insurance-Chaincode",           // Chaincode name
      "ClaimContract",                  // Contract name
      "privateTxn",                     // Transaction type
      transientData,                    // Transient data
      "submitMedicalReport",            // Function name
      reportId                          // Report ID
    );

    res.status(200).json({ 
      message: "Medical report submitted successfully.", 
      result: new TextDecoder().decode(result) 
    });
  } catch (error) {
    console.error("Error submitting medical report:", error);
    res.status(500).json({ message: "Error submitting medical report.", error: error.message });
  }
});


router.post("/readMedicalReport", async (req, res) => {
  const { reportId } = req.query; // Fetch reportId from query parameters
  const userClient = new clientApplication();

  if (!reportId) {
    return res.status(400).json({ message: "Report ID is required." });
  }

  try {
    const result = await userClient.submitTxn(
      "healthcareProvider",          // MSP for healthcare provider
      "insurancechannel",              // Channel name
      "Insurance-Chaincode",           // Chaincode name
      "ClaimContract",                  // Contract name
      "queryTxn",                       // Transaction type
      "",                               // No transient data
      "readMedicalReport",              // Chaincode function to invoke
      reportId                          // Function argument (Report ID)
    );

    const decodedResult = new TextDecoder().decode(result);
    res.status(200).json(JSON.parse(decodedResult)); // Parse and send the decoded JSON result
  } catch (error) {
    console.error("Error reading medical report:", error);
    res.status(500).json({ message: `Error reading medical report ${reportId}.`, error: error.message });
  }
});


router.post("/getMedicalReportsByPolicy", async (req, res) => {
  const { policyId } = req.query;  // Fetch policyId from query parameters
  const userClient = new clientApplication();

  // Validate if policyId is provided
  if (!policyId) {
    return res.status(400).json({ message: "Policy ID is required." });
  }

  try {
    // Submit the transaction to get medical reports by policyId
    const result = await userClient.submitTxn(
      "TPA",                      // MSP for TPA (Third Party Administrator)
      "insurancechannel",            // Channel name
      "Insurance-Chaincode",         // Chaincode name
      "ClaimContract",                // Contract name
      "queryTxn",                     // Transaction type
      "",                             // No transient data
      "getMedicalReportsByPolicy",    // Chaincode function to invoke
      policyId                        // Function argument (Policy ID)
    );

    // Decode the result (assuming it's a Uint8Array)
    const decodedResult = new TextDecoder().decode(result);
    
    // Send the decoded result as JSON response
    res.status(200).json(JSON.parse(decodedResult)); 
  } catch (error) {
    console.error("Error fetching medical reports by policyId:", error);
    
    // Respond with error message
    res.status(500).json({ 
      message: `Error fetching medical reports for policyId ${policyId}.`, 
      error: error.message 
    });
  }
});



router.post('/verifyPolicy', async (req, res) => {
  const { policyId, action } = req.body;
  const userClient = new clientApplication();

  if (!policyId || !action) {
      return res.status(400).json({ message: 'Policy ID and action are required' });
  }

  try {
      // Submit the verifyOrRejectPolicy transaction
      const result = await userClient.submitTxn(
          'TPA',                  // MSP for TPA
          'insurancechannel',     // Channel name
          'Insurance-Chaincode',  // Chaincode name
          'ClaimContract',        // Contract name
          'invokeTxn',            // Transaction type
          '',                     // No transient data
          'verifyOrRejectPolicy', // Chaincode function to invoke
          policyId,               // Function argument (Policy ID)
          action                  // Function argument (Action: 'verify' or 'reject')
      );

      const decodedResult = new TextDecoder().decode(result);
      res.status(200).json({ message: decodedResult });
  } catch (error) {
      console.error('Error managing policy:', error);
      res.status(500).json({
          message: `Error managing policy with ID ${policyId}`,
          error: error.message,
      });
  }
});



// router.post('/verifyPolicy', async (req, res) => {
//   const { policyId } = req.body; 
//   const userClient = new clientApplication();

//   if (!policyId) {
//       return res.status(400).json({ message: 'Policy ID is required' });
//   }

//   try {
//       // Submit the verifyPolicy transaction
//       const result = await userClient.submitTxn(
//           'TPA',                  // MSP for TPA
//           'insurancechannel',     // Channel name
//           'Insurance-Chaincode',  // Chaincode name
//           'ClaimContract',        // Contract name
//           'invokeTxn',            // Transaction type
//           '',                     // No transient data
//           'verifyPolicy',         // Chaincode function to invoke
//           policyId                // Function argument (Policy ID)
//       );

//       const decodedResult = new TextDecoder().decode(result);
//       res.status(200).json({ message: decodedResult });
//   } catch (error) {
//       console.error('Error verifying policy:', error);
//       res.status(500).json({
//           message: `Error verifying policy with ID ${policyId}`,
//           error: error.message,
//       });
//   }
// })


router.get('/queryVerifiedPolicies', async (req, res) => {
  const insurerClient = new clientApplication();

  try {
      // Query for verified policies
      const result = await insurerClient.submitTxn(
          'insurer',              
          'insurancechannel',     // Channel name
          'Insurance-Chaincode',  // Chaincode name
          'ClaimContract',        // Contract name
           "queryTxn",
           "",
          'queryVerifiedPolicies' // Chaincode function
      );

      const decodedResult = JSON.parse(new TextDecoder().decode(result));
      res.status(200).json({ success: true, data: decodedResult });
  } catch (error) {
      console.error('Error querying verified policies:', error);
      res.status(500).json({ message: error.message });
  }
});


router.post('/approvePolicy', async (req, res) => {
  const { policyId } = req.body;
  const insurerClient = new clientApplication();

  if (!policyId) {
      return res.status(400).json({ message: 'Policy ID is required' });
  }

  try {
      // Submit the approvePolicy transaction
      const result = await insurerClient.submitTxn(
          'insurer',              // MSP for Insurer
          'insurancechannel',     // Channel name
          'Insurance-Chaincode',  // Chaincode name
          'ClaimContract',        // Contract name
          'invokeTxn',            // Transaction type
          '',                     // No transient data
          'approvePolicy',        // Chaincode function
          policyId                // Function argument (Policy ID)
      );

      const decodedResult = new TextDecoder().decode(result);
      res.status(200).json({ message: decodedResult });
  } catch (error) {
      console.error('Error approving policy:', error);
      res.status(500).json({
          message: `Error approving policy with ID ${policyId}`,
          error: error.message,
      });
  }
});



router.post("/queryallpolicies", async (req, res) => {
  try {
    const userClient = new clientApplication();

    // Invoke the chaincode function
    const policiesData = await userClient.submitTxn(
      "insurer",
      "insurancechannel",
      "Insurance-Chaincode",
      "PolicyContract",
      "queryTxn",
      "",
      "queryAllPolicies"
    );

    // Decode and parse the result
    const policies = JSON.parse(new TextDecoder().decode(policiesData));

    // Structure the response
    res.status(200).json({
      success: true,
      message: "Policies retrieved successfully!",
      data: { value: policies }, // Frontend expects `data.value`
    });
  } catch (error) {
    console.error("Error retrieving policies:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving policies!",
      data: { error: error.message },
    });
  }
});



// Endpoint to get policies by range of keys
router.post("/getpoliciesbyrange", async (req, res) => {
  try {
    const { startKey, endKey } = req.body;
    const insurerClient = new clientApplication();

    const policiesData = await insurerClient.submitTxn(
      "insurer",
      "insurancechannel",
      "Insurance-Chaincode",
      "PolicyContract",
      "queryTxn",
      "",
      "getPoliciesByRange",
      startKey,
      endKey
    );
    const policies = JSON.parse(new TextDecoder().decode(policiesData));

    res.status(200).json({
      success: true,
      message: "Policies within range retrieved successfully!",
      data: policies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving policies by range!",
      data: { error },
    });
  }
});

// Endpoint to get policy history by policy ID
router.post("/getpolicyhistory", async (req, res) => {
  try {
    const { policyId } = req.body;
    const insurerClient = new clientApplication();

    const historyData = await insurerClient.submitTxn(
      "insurer",
      "insurancechannel",
      "Insurance-Chaincode",
      "PolicyContract",
      "queryTxn",
      "",
      "getPolicyHistory",
      policyId
    );
    const history = JSON.parse(new TextDecoder().decode(historyData));

    res.status(200).json({
      success: true,
      message: "Policy history retrieved successfully!",
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving policy history!",
      data: { error },
    });
  }
});

// Claim Routes

// Endpoint to query all claims
router.get("/queryallclaims", async (req, res) => {
  try {
    const healthcareProviderClient = new clientApplication();

    const claimsData = await healthcareProviderClient.submitTxn(
      "healthcareProvider",
      "insurancechannel",
      "Insurance-Chaincode",
      "ClaimContract",
      "queryTxn",
      "",
      "queryAllClaims"
    );
    const claims = JSON.parse(new TextDecoder().decode(claimsData));

    res.status(200).json({
      success: true,
      message: "Claims retrieved successfully!",
      data: claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving claims!",
      data: { error },
    });
  }
});

// Endpoint for regulatory authority to audit a claim
router.post("/auditclaim", async (req, res) => {
  try {
    const { claimId } = req.body;
    const regulatoryClient = new clientApplication();

    const claimData = await regulatoryClient.submitTxn(
      "regulatoryAuthority",
      "insurancechannel",
      "Insurance-Chaincode",
      "ClaimContract",
      "queryTxn",
      "",
      "auditClaimByRegulatory",
      claimId
    );
    const claim = JSON.parse(new TextDecoder().decode(claimData));

    res.status(200).json({
      success: true,
      message: "Claim audited successfully!",
      data: claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error auditing claim!",
      data: { error },
    });
  }
});


// router.get("/viewAllPolicies", async (req, res) => {
//   try {
//     const regulatoryClient = new clientApplication();

//     const result = await regulatoryClient.submitTxn(
//       "regulatoryAuthority", // MSP for Regulatory Authority
//       "insurancechannel",
//       "Insurance-Chaincode",
//       "ClaimContract",
//       "queryAllPolicies", // Function in ClaimContract to get all policies
//       "queryTxn",
//       "",
//       "viewAllPolicies"
//     );

//     res.status(200).json({
//       success: true,
//       message: "All policies fetched successfully!",
//       data: { result },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching policies. Please try again later!",
//       data: { error },
//     });
//   }
// });

// // Route to view verified policies
// router.get("/viewVerifiedPolicies", async (req, res) => {
//   try {
//     const regulatoryClient = new clientApplication();

//     const result = await regulatoryClient.submitTxn(
//       "regulatoryAuthority", // MSP for Regulatory Authority
//       "insurancechannel",
//       "Insurance-Chaincode",
//       "ClaimContract",
//       "queryVerifiedPolicies", // Function in ClaimContract to get verified policies
//       "queryTxn",
//       "",
//       "viewVerifiedPolicies"
//     );

//     res.status(200).json({
//       success: true,
//       message: "Verified policies fetched successfully!",
//       data: { result },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching verified policies. Please try again later!",
//       data: { error },
//     });
//   }
// });


// Export the router
module.exports = router;
