import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, newTrainingJob } from '../auth/config/firebase-config';
import ModelService from '../data/ModelList';

const NewJobModal = () => {
  const [trainingDataOption, setTrainingDataOption] = useState('selectExisting');
  const [validationDataOption, setValidationDataOption] = useState('none');
  const [suffix, setSuffix] = useState('');
  const [seed, setSeed] = useState('Random');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [huggingFaceId, setHuggingFaceId] = useState('');
  const [validationCriteria, setValidationCriteria] = useState(['']);
  const [batchSize, setBatchSize] = useState(50);
  const [batchSizeAuto, setBatchSizeAuto] = useState(true);
  const [learningRateMultiplier, setLearningRateMultiplier] = useState(1);
  const [learningRateAuto, setLearningRateAuto] = useState(true);
  const [numberOfEpochs, setNumberOfEpochs] = useState(5);
  const [numberOfEpochsAuto, setNumberOfEpochsAuto] = useState(true);
  const [fineTuningType, setFineTuningType] = useState('text-generation');
  const [validationFile, setValidationFile] = useState(null);
  const [models, setModels] = useState([]);
  const [modelParams, setModelParams] = useState('');
  const [baseModel, setBaseModel] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModelSelectModal, setShowModelSelectModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formError, setFormError] = useState('');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (showModelSelectModal) {
      const fetchedModels = ModelService.fetchAll();
      const groupedModels = fetchedModels.reduce((acc, model) => {
        const paramSize = `${model.numParameters} Params`;
        if (!acc[paramSize]) acc[paramSize] = [];
        acc[paramSize].push(model);
        return acc;
      }, {});
      setModels(groupedModels);
      setFilteredModels(groupedModels);
    }
  }, [showModelSelectModal]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (!term) {
      setFilteredModels(models);
      return;
    }
    const filtered = Object.keys(models).reduce((acc, key) => {
      const matchedModels = models[key].filter(model =>
        model.modelId.toLowerCase().includes(term.toLowerCase())
      );
      if (matchedModels.length > 0) {
        acc[key] = matchedModels;
      }
      return acc;
    }, {});
    setFilteredModels(filtered);
  };

  const toggleModelSelectModal = () => setShowModelSelectModal(!showModelSelectModal);

  const handleCriteriaChange = (index, event) => {
    const newCriteria = [...validationCriteria];
    newCriteria[index] = event.target.value;
    setValidationCriteria(newCriteria);
  };

  const handleAddCriteria = () => {
    setValidationCriteria([...validationCriteria, '']);
  };

  const handleRemoveCriteria = (index) => {
    const newCriteria = [...validationCriteria];
    newCriteria.splice(index, 1);
    setValidationCriteria(newCriteria);
  };

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      if (fileType === 'training') {
        setUploadedFile(file);
      } else if (fileType === 'validation') {
        setValidationFile(file);
      }
    }
  };

  const handleHuggingFaceIdChange = (event) => {
    setHuggingFaceId(event.target.value);
  };

  const handleModelSelection = (modelId, params) => {
    setBaseModel(modelId);
    setModelParams(params);
    toggleModelSelectModal();
  };

  const resetForm = () => {
    setTrainingDataOption('selectExisting');
    setValidationDataOption('none');
    setSuffix('');
    setSeed('Random');
    setUploadedFile(null);
    setHuggingFaceId('');
    setValidationCriteria(['']);
    setBatchSize(50);
    setBatchSizeAuto(true);
    setLearningRateMultiplier(1);
    setLearningRateAuto(true);
    setNumberOfEpochs(5);
    setNumberOfEpochsAuto(true);
    setFineTuningType('text-generation');
    setValidationFile(null);
    setBaseModel('');
    setModelParams('');
  };

  const isFormValid = () => {
    let errors = [];
    if (baseModel.trim() === '') {
      errors.push('Base model ID is required.');
    }
    if (huggingFaceId.trim() === '') {
      errors.push('Hugging Face ID is required.');
    }
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setShowProgress(true);
    const jobData = {
      userId: user.uid,
      baseModel,
      modelParams,
      trainingDataOption,
      validationDataOption,
      suffix,
      seed,
      huggingFaceId,
      validationCriteria,
      batchSize,
      batchSizeAuto,
      learningRateMultiplier,
      learningRateAuto,
      numberOfEpochs,
      numberOfEpochsAuto,
      fineTuningType,
      status: 'pending'
    };

    try {
      await newTrainingJob(jobData);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        resetForm();
        navigate('/llms');
      }, 2000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    } finally {
      setShowProgress(false);
    }
  };

  return (
    
    <Box className="flex flex-col ml-64 bg-white p-6 mt-16" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
      {formError && (
        <Box className="fixed inset-0 flex justify-center items-center z-50" sx={{ backdropFilter: 'blur(8px)' }}>
          <Box className="w-full max-w-md mx-auto">
            <Box className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{formError}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setFormError('')}>
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 1 1-1.697 1.697l-2.651-2.65-2.651 2.65a1.2 1.2 0 1 1-1.697-1.697l2.651-2.651-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697l2.651 2.651 2.651-2.651z" />
                </svg>
              </span>
            </Box>
          </Box>
        </Box>
      )}

      {showProgress && (
        <Box className="fixed inset-0 flex justify-center items-center z-50" sx={{ backdropFilter: 'blur(8px)' }}>
          <Box className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <Typography variant="h6">Submitting...</Typography>
            <Box
              sx={{
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                animation: 'spin 2s linear infinite'
              }}
            ></Box>
          </Box>
        </Box>
      )}
      {showSuccessAlert && (
        <Box className="fixed inset-0 flex justify-center items-center z-50" sx={{ backdropFilter: 'blur(8px)' }}>
          <Box className="w-full max-w-md mx-auto">
            <Box className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">Training job submitted for training successfully!</span>
            </Box>
          </Box>
        </Box>
      )}

      {showError && (
        <Box className="fixed inset-0 flex justify-center items-center z-50" sx={{ backdropFilter: 'blur(8px)' }}>
          <Box className="w-full max-w-md mx-auto">
            <Box className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">Failed to submit the model for training. Please try again.</span>
            </Box>
          </Box>
        </Box>
      )}

      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5">Fine Tuning Job </Typography>
      </Box>

      <Paper elevation={3}>
      <Box className="bg-white p-5 rounded-lg w-full overflow-y-auto">
        <Box className="space-y-6">
          <Box className="space-y-4">
            <Box>
              <Typography variant="body1">Fine-Tuning Job Type</Typography>
              <TextField
                select
                fullWidth
                variant="outlined"
                value={fineTuningType}
                onChange={(e) => setFineTuningType(e.target.value)}
                SelectProps={{ native: true }}
                InputProps={{ style: { fontFamily: 'Poppins', fontSize: '14px' } }}
              >
                <option value="text-generation">Text Generation</option>
              </TextField>
            </Box>
          </Box>

          <Box className="flex flex-col space-y-4">
            <Box className="flex items-center">
              <Box className="flex-1 pr-4">
                <Typography variant="body1">Base Model</Typography>
                <Typography variant="body2" color="textSecondary">Provide baseline model ID, used as the starting point for training.</Typography>
                <Box className="flex items-center">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Provide baseline model ID"
                    value={baseModel}
                    onChange={(e) => setBaseModel(e.target.value)}
                    InputProps={{ style: { fontFamily: 'Poppins', fontSize: '14px' } }}
                  />
                  <Button
                    sx={{ ml: 2, backgroundColor: 'MediumSeaGreen', color: '#ffd433', fontFamily: 'Poppins', fontSize: '12px' }}
                    onClick={toggleModelSelectModal}
                  >
                    Select Model
                  </Button>
                </Box>
              </Box>
            </Box>

            {showModelSelectModal && (
              <Dialog open={showModelSelectModal} onClose={toggleModelSelectModal}>
                <DialogTitle>Select a Hugging Face Model ID</DialogTitle>
                <DialogContent>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search model..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{ style: { fontFamily: 'Poppins', fontSize: '14px' } }}
                  />
                  <Box className="my-4" sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {Object.keys(filteredModels).length > 0 ? Object.keys(filteredModels).map((group) => (
                      <Box key={group}>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 1 }}>{group}</Typography>
                        <ul>
                          {filteredModels[group].map((model, index) => (
                            <li key={index} className="text-blue-500 hover:text-blue-700 cursor-pointer p-1"
                              onClick={() => handleModelSelection(model.modelId, group)}>
                              {model.modelId}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )) : <Typography variant="body2" color="textSecondary">No models found.</Typography>}
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={toggleModelSelectModal} sx={{ backgroundColor: 'black', color: '#ffd433', fontFamily: 'Poppins', fontSize: '14px' }}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            )}

            <Box>
              <Typography variant="body1">Training Data</Typography>
              <Typography variant="body2" color="textSecondary">Add a JSON file to use for training or provide hugging face dataset id.</Typography>
              <Box className="mt-2">
                <FormControlLabel
                  control={<Checkbox checked={trainingDataOption === 'uploadNew'} onChange={() => setTrainingDataOption('uploadNew')} />}
                  label="Upload new"
                />
                <FormControlLabel
                  control={<Checkbox checked={trainingDataOption === 'selectExisting'} onChange={() => setTrainingDataOption('selectExisting')} />}
                  label="Hugging face dataset Id"
                />
              </Box>
              {trainingDataOption === 'uploadNew' ? (
                <Box className="mt-4">
                  <Box className="flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-800">
                    <Box className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path fillRule="evenodd" d="M18.032 5.024C17.75 5 17.377 5 16.8 5h-5.3c-.2 1-.401 1.911-.61 2.854-.131.596-.247 1.119-.523 1.56a2.998 2.998 0 0 1-.953.954c-.441.275-.964.39-1.56.522l-.125.028-2.512.558A1.003 1.003 0 0 1 5 11.5v5.3c0 .577 0 .949.024 1.232.022.272.06.372.085.422a1 1 0 0 0 .437.437c.05.025.15.063.422.085C6.25 19 6.623 19 7.2 19H10a1 1 0 1 1 0 2H7.161c-.527 0-.981 0-1.356-.03-.395-.033-.789-.104-1.167-.297a3 3 0 0 1-1.311-1.311c-.193-.378-.264-.772-.296-1.167A17.9 17.9 0 0 1 3 16.838V11c0-2.075 1.028-4.067 2.48-5.52C6.933 4.028 8.925 3 11 3h5.838c.528 0 .982 0 1.357.03.395.033.789.104 1.167.297a3 3 0 0 1 1.311 1.311c.193.378.264.772.296 1.167.031.375.031.83.031 1.356V10a1 1 0 1 1-2 0V7.2c0-.577 0-.949-.024-1.232-.022-.272-.06-.373-.085-.422a1 1 0 0 0-.437-.437c-.05-.025-.15-.063-.422-.085ZM5.28 9.414l2.015-.448c.794-.177.948-.225 1.059-.294a1 1 0 0 0 .318-.318c.069-.11.117-.265.294-1.059l.447-2.015c-.903.313-1.778.874-2.518 1.615-.741.74-1.302 1.615-1.615 2.518ZM17 15a1 1 0 1 1 2 0v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2Z" clipRule="evenodd"></path>
                      </svg>
                      <Box className="flex text-sm text-gray-300">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-200 hover:text-indigo-100 focus-within:outline-none">
                          <span>{uploadedFile ? uploadedFile.name : 'Upload a file or drag and drop here'}</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'training')} />
                        </label>
                      </Box>
                      <Typography variant="body2" color="textSecondary">(JSON files, csv, xlsx, zip)</Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box className="mt-4">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter Hugging Face dataset ID"
                    value={huggingFaceId}
                    onChange={handleHuggingFaceIdChange}
                    InputProps={{ style: { fontFamily: 'Poppins', fontSize: '14px' } }}
                  />
                </Box>
              )}
            </Box>
          </Box>

          <Box>
            <Button
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              sx={{ backgroundColor: 'MediumSeaGreen', color: '#ffd433', fontFamily: 'Poppins', fontSize: '14px', mt: 2 }}
            >
              {showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings
            </Button>

            {showAdvancedSettings && (
              <Box className="space-y-6 mt-4 bg-gray-200 p-4 rounded-lg">
                <Typography variant="body1">Hyperparameter Tuning</Typography>

                <Box className="space-y-4">
                  <Box className="flex flex-col space-y-2">
                    <Box className="flex justify-between items-center">
                      <Typography variant="body2">Batch size</Typography>
                      <Box className="flex items-center">
                        <Checkbox checked={batchSizeAuto} onChange={() => setBatchSizeAuto(!batchSizeAuto)} />
                        <Typography variant="body2" sx={{ ml: 1 }}>{batchSizeAuto ? 'Auto' : batchSize}</Typography>
                      </Box>
                    </Box>
                    <Slider
                      min={1}
                      max={100}
                      value={batchSize}
                      disabled={batchSizeAuto}
                      onChange={(e, value) => setBatchSize(value)}
                    />
                  </Box>

                  <Box className="flex flex-col space-y-2">
                    <Box className="flex justify-between items-center">
                      <Typography variant="body2">Learning rate multiplier</Typography>
                      <Box className="flex items-center">
                        <Checkbox checked={learningRateAuto} onChange={() => setLearningRateAuto(!learningRateAuto)} />
                        <Typography variant="body2" sx={{ ml: 1 }}>{learningRateAuto ? 'Auto' : learningRateMultiplier}</Typography>
                      </Box>
                    </Box>
                    <Slider
                      min={0.1}
                      max={10}
                      step={0.1}
                      value={learningRateMultiplier}
                      disabled={learningRateAuto}
                      onChange={(e, value) => setLearningRateMultiplier(value)}
                    />
                    <Typography variant="body2" color="textSecondary">In most cases, range of 0.1-10 is recommended.</Typography>
                  </Box>

                  <Box className="flex flex-col space-y-2">
                    <Box className="flex justify-between items-center">
                      <Typography variant="body2">Number of epochs</Typography>
                      <Box className="flex items-center">
                        <Checkbox checked={numberOfEpochsAuto} onChange={() => setNumberOfEpochsAuto(!numberOfEpochsAuto)} />
                        <Typography variant="body2" sx={{ ml: 1 }}>{numberOfEpochsAuto ? 'Auto' : numberOfEpochs}</Typography>
                      </Box>
                    </Box>
                    <Slider
                      min={1}
                      max={100}
                      value={numberOfEpochs}
                      disabled={numberOfEpochsAuto}
                      onChange={(e, value) => setNumberOfEpochs(value)}
                    />
                    <Typography variant="body2" color="textSecondary">In most cases, range of 1-10 is recommended.</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          <Box className="mt-4 flex justify-between space-x-3">
            <Button
              onClick={resetForm}
              sx={{ backgroundColor: 'gray', color: '#ffd433', fontFamily: 'Poppins', fontSize: '14px' }}
            >
              Reset
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{ backgroundColor: 'black', color: '#ffd433', fontFamily: 'Poppins', fontSize: '14px' }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
      </Paper>
    </Box>
  );
};

export default NewJobModal;
