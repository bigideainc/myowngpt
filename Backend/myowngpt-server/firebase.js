// firebase.js
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const { getStorage } = require('firebase-admin/storage');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'echo-fe663',
    clientEmail: 'firebase-adminsdk-x8w53@echo-fe663.iam.gserviceaccount.com',
    privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDR1K0Ekezko301\nG8KorlqNSTKpxuKBG22I3dzFpYqsfSVFRFjWH+wqFSGjm/xKZqLnQ6C0jTrlAk0m\nTvZYgMlLriha//ZWd0AHozYVCtOsNbxogPILgSQ57Pzk8YkkuzzxsgpuukN3dgeY\nj2UR5h2JDJQvI09pgI0WRUThAV/Th1djBPWxu2DHo/+V4mF0RylAC20zXTE5/BZf\ni4IjhJCvrwIliNUgmkKVWvI9Tvt7pwW57nLQkEWl0T6PnKCWRdeMB1s+JUK8CR+z\nFo2unETXrsa9Wpy/yHQX6CzrOqNcg+foqJ/+7/9S7gxzohLsU/9SqOQB/6EeoneV\nDMARug5lAgMBAAECggEAH1KHDVKXMT4yd5YQRcvZGpQdqvhUYX9tp2uvBBYFEGCS\nCrf8JuKXB2UmI10qmRSfJrSSrcETVJI2YAyTe3ymD9UMkyD4bcnZVgqIDTYTiPZw\njI0LFKqPdNIqoiZoGYKVw2KXahYF8jQ9SAnHxZc7O3UUPcEgnpgg930ZnhjtbA7X\nyWJzXSXlLKyKAncZHYs8xrlq9TiP5QO9H/c5m75qtLqhVXUH15IuGyqJoWLRmFS7\nMIsXFIn3VE3UYDAoqV0376I0qaA0H5hjZUQnWkS2IQ3OqnMK37YR+PX17lrInQVq\nV1fHh1k2Ncwzg2cycwhQSJ1sjDYvJ/DBYBxpfSrRoQKBgQDrfOdZzf4Az3i1bc4O\n8E6OcVPQMnTysDsWgTQbgERSmG1PCcPv0xHTzZxaWIAVdy53Oz26xu9mDWUuewIh\nEwuOMZs0IZzLaAsC8Uci4S3gpzSdoCQ23tF076hlqACE3tCv+XGvW0vxmzDm7dgN\nXrgBnO/qcjl+WyD9okxMVylTaQKBgQDkG6YbY8xjBCKi6vLP8oVhG8AS5i0dcmVH\nDYNLqNL0MGUnyeFieV0ODgpoKmckvOSx1ygN2gckCxySwyEH6XFB34Im9XfNxAep\n8Q4Sry30qwyNBCa9uwyROa29DIR9K99aql0l/fqg2/h1/8PZlc5bGtELhbTUSHeG\nOXZ8bXDPnQKBgFiVUr3whEUvxnuRQ7tQ4Gwq61ldMar9aizMC5rwxELBvhTGWqOD\npagkJ1XBBuWMQLlvWohBP1sHXPGAKkvgyy8BMB4LKt1FVScVNipDxKtGmr9Ut2rA\npNA1OwaKjS9uVdhsoDxTvpyzQVENVYGqCNPqgkGSGFiU1TMz8zmgbBZJAoGBANyX\n6HFAd92hmCVZdOuoq1gX0A32ztZVVJ/772bxouBHFOv/jZj/qP/4kBPgPdMHYVqi\nqbeLi7BNlppPXdga504+6cznQa6ZzpeH6IYlJxofeIm+5ABDrYmb7+qM+mtaTCuP\n6XjePsvlLkheyXXYK7FrI5IzAYbxdbU2SOFXrOr5An8gycFdmLqLCe5YDD5sGrSV\n/MZMeln4F8dIZFImW5Nc28m8Gjoh//I4yjuceE0KNGwDGnMPXRB9cESJDpCxa+dS\nBWf0KPwZvgtWbLFYADXID9+2dYj3qkKDxd5qXrqpU9l+K/zDRK3O3+ddJK+7xf8s\ncyQ1+Od3auueWu5pipFM\n-----END PRIVATE KEY-----\n`, // Directly added private key
  }),
  storageBucket: 'echo-fe663.appspot.com'
});

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   }),
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET
// });

const db = admin.firestore();
const storage = getStorage();

async function saveDatasetDetails(datasetName, repoId, userId, license, visibility, models, tags, submissionTime, fileSize, uploadedAt) {
  const datasetsRef = db.collection('datasets');
  try {
    const newDataset = {
      datasetName,
      repoId,
      userId,
      license,
      visibility,
      models,
      tags,
      submissionTime,
      fileSize,
      uploadedAt,
      usage: 0
    };
    await datasetsRef.add(newDataset);
    console.log(`Dataset details saved with datasetName: ${datasetName}`);
  } catch (error) {
    console.error("Error saving dataset details:", error);
    throw error;
  }
}

async function uploadFile(bucketPath, fileBuffer, mimeType) {
  console.log("Uploading file:", fileBuffer);
  const file = storage.bucket().file(bucketPath);
  const options = {
    metadata: {
      contentType: mimeType,
    },
  };

  if (!fileBuffer) {
    throw new Error('File buffer is undefined');
  }

  await file.save(fileBuffer, options);
  console.log(`File uploaded to ${bucketPath}`);
  return bucketPath;
}

// Completed Jobs
async function saveCompletedJob(jobId, minerId, huggingFaceRepoId, loss, accuracy, totalPipelineTime) {
  const completedJobsRef = db.collection('completed_jobs');
  try {
      const newJob = {
          jobId: jobId,
          minerId: minerId,
          huggingFaceRepoId: huggingFaceRepoId,
          loss,
          accuracy,
          totalPipelineTime,
          completedAt: admin.firestore.FieldValue.serverTimestamp()
      };
      await completedJobsRef.add(newJob);
      console.log(`Completed job saved with jobId: ${jobId}`);
  } catch (error) {
      console.error("Error saving completed job:", error);
      throw error;
  }
}

async function updatestatus(docId, status, completedAt) {
  const docRef = db.collection('fine_tuning_jobs').doc(docId);
  try {
      const doc = await docRef.get();

      if (!doc.exists) {
          console.log('No such document!');
          return null;
      }

      const updateData = { status: status };

      // Check if completedAt is provided
      if (completedAt) {
          updateData['completed_at'] = admin.firestore.FieldValue.serverTimestamp();
      } else {
          // Check if completed_at field does not exist and set the server timestamp
          if (!doc.data().hasOwnProperty('completed_at')) {
              updateData['completed_at'] = admin.firestore.FieldValue.serverTimestamp();
          }
      }

      await docRef.update(updateData);
  } catch (error) {
      console.error("Error updating job status:", error);
  }
}


async function addTrainingJob(jobData, paramsCount, uploadedTrainingFile, uploadedValidationFile, trainingScriptFile) {
  try {
    // First, add a preliminary document to Firestore to generate docRef and get the ID
    const docRef = await db.collection('fine_tuning_jobs').add({
      ...jobData,
      paramsCount, // Add the parameters count to the Firestore document
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending'
    });

    // Initialize file paths using the generated docRef ID
    let trainingFilePath = uploadedTrainingFile ? `training/${docRef.id}/${uploadedTrainingFile.originalname}` : '';
    let validationFilePath = uploadedValidationFile ? `validation/${docRef.id}/${uploadedValidationFile.originalname}` : '';
    let scriptPath = trainingScriptFile ? `scripts/${docRef.id}/${new Date().toISOString().replace(/:/g, '-')}-script.py` : '';

    // Upload the files if they exist and update the paths in the document
    if (uploadedTrainingFile) {
      await uploadFile(trainingFilePath, uploadedTrainingFile.buffer, uploadedTrainingFile.mimetype);
    }
    if (uploadedValidationFile) {
      await uploadFile(validationFilePath, uploadedValidationFile.buffer, uploadedValidationFile.mimetype);
    }
    if (trainingScriptFile) {
      await uploadFile(scriptPath, trainingScriptFile.buffer, 'text/x-python-script');
    }

    // Update the Firestore document with the file paths
    await docRef.update({
      trainingFilePath,
      validationFilePath,
      scriptPath
    });

    console.log("Fine-tuning job submitted with ID:", docRef.id);
    return docRef.id;  // Returning the document ID for further use
  } catch (error) {
    console.error("Error submitting fine-tuning job:", error);
    throw error;
  }
}

// Fetch training jobs
async function fetchPendingTrainingJobs() {
  try {
    const querySnapshot = await db.collection('fine_tuning_jobs')
      .where('status', '==', 'pending')
      .get();

    if (querySnapshot.empty) {
      console.log('No pending training jobs found.');
      return [];
    }

    const pendingJobs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(pendingJobs);  // Log the pending jobs to console for verification
    return pendingJobs;
  } catch (error) {
    console.error("Error fetching pending training jobs:", error);
    return [];  // Return an empty array in case of error
  }
}

async function fetchPendingJobDetails() {
  try {
    const querySnapshot = await db.collection('fine_tuning_jobs')
      .where('status', '==', 'pending')
      .get();

    if (querySnapshot.empty) {
      console.log('No pending training jobs found.');
      return [];
    }

    const pendingJobDetails = querySnapshot.docs.map(doc => ({
      id: doc.id,
      fineTuningType: doc.data().fineTuningType,
      modelId: doc.data().baseModel,
      params: doc.data().paramsCount,
      status: doc.data().status
    }));

    console.log(pendingJobDetails);  // Log the details to console for verification
    return pendingJobDetails;
  } catch (error) {
    console.error("Error fetching pending job details:", error);
    return [];  // Return an empty array in case of error
  }
}

async function fetchJobDetailsById(docId) {
  try {
    const docRef = db.collection('fine_tuning_jobs').doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log('No such document!');
      return null;
    }

    console.log('Document data:', doc.data());
    return doc.data();
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;  // Return null in case of error
  }
}

// async function updatestatus(docId, status){
//   const docRef = db.collection('fine_tuning_jobs').doc(docId);
//   try {
    
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       console.log('No such document!');
//       return null;
//     }

//     // Update the job status to 'running'
//     await docRef.update({
//       status: status
//     });
//   } catch (error) {
//     console.error("Error updating job status:", error);
//   }
// }

async function start_training(docId, minerId, systemDetails) {
  const docRef = db.collection('fine_tuning_jobs').doc(docId);
  const jobExecutionRef = db.collection('job_executions');

  try {
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log('No such document!');
      return null;
    }

    // Update the job status to 'running'
    await docRef.update({
      status: 'running'
    });

    // Create a job execution record
    const jobExecutionData = {
      userId: doc.data().userId,
      minerId: minerId,
      jobId: docId,
      systemDetails: systemDetails,
      status: 'running',
      startDate: admin.firestore.FieldValue.serverTimestamp(),
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    };

    await jobExecutionRef.add(jobExecutionData);

    // Initialize URLs
    let scriptUrl, trainingFileUrl, validationFileUrl;

    // Retrieve file URLs if necessary
    if (doc.data().scriptPath) {
      const scriptRef = storage.bucket().file(doc.data().scriptPath);
      [scriptUrl] = await scriptRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
    }
    if (doc.data().trainingFilePath) {
      const trainingRef = storage.bucket().file(doc.data().trainingFilePath);
      [trainingFileUrl] = await trainingRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
    }
    if (doc.data().validationFilePath) {
      const validationRef = storage.bucket().file(doc.data().validationFilePath);
      [validationFileUrl] = await validationRef.getSignedUrl({ action: 'read', expires: '03-09-2491' });
    }

    const updatedData = {
      ...doc.data(),
      scriptUrl: scriptUrl || '', // Provide fallback empty string if undefined
      trainingFileUrl: trainingFileUrl || '', // Provide fallback empty string if undefined
      validationFileUrl: validationFileUrl || '' // Provide fallback empty string if undefined
    };

    return updatedData;

  } catch (error) {
    console.error("Error in starting training job:", error);
    return null;
  }
}

async function registerMiner(minerData) {
  const hashedPassword = await bcrypt.hash(minerData.password, 10); // Hash the password
  try {
    const docRef = await db.collection('miners').add({
      ethereumAddress: minerData.ethereumAddress,
      username: minerData.username,
      email: minerData.email,
      password: hashedPassword, // Store the hashed password
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Miner registered with ID:", docRef.id);
    return { username: minerData.username, password: minerData.password };
  } catch (error) {
    console.error("Error registering miner:", error);
    throw error;
  }
}

// // Function to log miner's listening status
// async function logMinerListening(minerId) {
//   const listeningRef = db.collection('listening_miners');
//   try {
//     const docRef = await listeningRef.add({
//       minerId: minerId,
//       startedListening: admin.firestore.FieldValue.serverTimestamp(),
//       status: 'listening'
//     });
//     console.log("Miner listening logged with ID:", docRef.id);
//     return docRef.id;  // Returning the document ID for further reference
//   } catch (error) {
//     console.error("Error logging miner listening:", error);
//     throw error;
//   }
// }

// Call logMinerListening when a miner successfully logs in

async function authenticateMiner(username, password) {
  const minersRef = db.collection('miners');
  const snapshot = await minersRef.where('username', '==', username).limit(1).get();
  if (snapshot.empty) {
      throw new Error('No matching user');
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();
  const userId = userDoc.id;

  const passwordMatch = await bcrypt.compare(password, userData.password);
  if (passwordMatch) {
      console.log("Authenticated miner ID:", userId);
      return { userId, ...userData };
  } else {
      throw new Error('Invalid credentials');
  }
}

async function logMinerListening(minerId) {
  const listeningRef = db.collection('listening_miners');
  try {
      const docRef = await listeningRef.add({
          minerId: minerId,
          startedListening: admin.firestore.FieldValue.serverTimestamp(),
          status: 'listening'
      });
      console.log("Miner listening logged with ID:", docRef.id);
      return docRef.id;  // Returning the document ID for further reference
  } catch (error) {
      console.error("Error logging miner listening:", error);
      throw error;
  }
}

async function saveSystemDetails(minerId, systemDetails) {
  const systemDetailsRef = db.collection('miner_system_details');
  try {
      const docRef = await systemDetailsRef.add({
          minerId: minerId,
          systemDetails: systemDetails,
          loggedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log("System details saved with ID:", docRef.id);
      return docRef.id;  // Returning the document ID for further reference
  } catch (error) {
      console.error("Error saving system details:", error);
      throw error;
  }
}

async function fetchCompletedJobs() {
  try {
    const completedJobsRef = db.collection('completed_jobs');
    const querySnapshot = await completedJobsRef.get();

    if (querySnapshot.empty) {
      console.log('No completed jobs found.');
      return [];
    }

    const completedJobs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(completedJobs);  // Log the completed jobs to console for verification
    return completedJobs;
  } catch (error) {
    console.error("Error fetching completed jobs:", error);
    return [];  // Return an empty array in case of error
  }
}

async function updateJobStatusToRewarded(jobId) {
  const completedJobsRef = db.collection('completed_jobs').doc(jobId);
  
  try {
      const doc = await completedJobsRef.get();

      if (!doc.exists) {
          throw new Error('Job not found.');
      }

      // Update the job status to "rewarded"
      await completedJobsRef.update({
          status: 'rewarded',
          reward_message: 'Job status updated to rewarded',
          completedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return { success: true, message: `Job ${jobId} status updated to rewarded.` };
  } catch (error) {
      console.error('Failed to update job status:', error);
      return { success: false, error: 'Failed to update job status.' };
  }
}

module.exports = {
  addTrainingJob, updateJobStatusToRewarded, fetchCompletedJobs, saveDatasetDetails, updatestatus, saveCompletedJob, logMinerListening, saveSystemDetails, authenticateMiner, start_training, registerMiner, fetchPendingTrainingJobs, fetchPendingJobDetails, fetchJobDetailsById
};
