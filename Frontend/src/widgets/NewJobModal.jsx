import React, { useState } from 'react';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Slider, TextField, Typography, Select, MenuItem, FormControl, InputLabel, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, newTrainingJob } from '../auth/config/firebase-config';
import { modelOptions, datasetOptions } from './ModelConstants';

const NewJobModal = () => {
  const [formData, setFormData] = useState({
    trainingDataOption: 'selectExisting',
    validationDataOption: 'none',
    suffix: '',
    seed: 'Random',
    uploadedFile: null,
    huggingFaceId: '',
    validationCriteria: [''],
    batchSize: 50,
    batchSizeAuto: true,
    learningRateMultiplier: 1,
    learningRateAuto: true,
    numberOfEpochs: 5,
    numberOfEpochsAuto: true,
    fineTuningType: 'text-generation',
    validationFile: null,
    baseModel: '',
  });

  const [showProgress, setShowProgress] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formError, setFormError] = useState('');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const user = auth.currentUser;
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      trainingDataOption: 'selectExisting',
      validationDataOption: 'none',
      suffix: '',
      seed: 'Random',
      uploadedFile: null,
      huggingFaceId: '',
      validationCriteria: [''],
      batchSize: 50,
      batchSizeAuto: true,
      learningRateMultiplier: 1,
      learningRateAuto: true,
      numberOfEpochs: 5,
      numberOfEpochsAuto: true,
      fineTuningType: 'text-generation',
      validationFile: null,
      baseModel: '',
    });
  };

  const isFormValid = () => {
    let errors = [];
    if (formData.baseModel.trim() === '') {
      errors.push('Base model ID is required.');
    }
    if (formData.huggingFaceId.trim() === '') {
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
      ...formData,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSliderChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box className="flex flex-col ml-64 bg-slate-100 p-6 mt-16" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
      {formError && (
        <AlertBox message={formError} type="error" onClose={() => setFormError('')} />
      )}
      {showProgress && (
        <ProgressBox />
      )}
      {showSuccessAlert && (
        <AlertBox message="Training job submitted for training successfully!" type="success" />
      )}
      {showError && (
        <AlertBox message="Failed to submit the model for training. Please try again." type="error" />
      )}

      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h5">Fine Tuning Job</Typography>
      </Box>

      <Paper elevation={3}>
        <Box className="bg-white p-5 rounded-lg w-full overflow-y-auto">
          <Box className="space-y-6">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Fine-Tuning Job Type</InputLabel>
              <Select
                value={formData.fineTuningType}
                onChange={handleInputChange}
                name="fineTuningType"
                label="Fine-Tuning Job Type"
                inputProps={{ style: { fontFamily: 'Poppins', fontSize: '14px' } }}
              >
                <MenuItem value="text-generation">Text Generation</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel>Base Model</InputLabel>
              <Select
                value={formData.baseModel}
                onChange={handleInputChange}
                name="baseModel"
                label="Base Model"
                inputProps={{ style: { fontFamily: 'Poppins', fontSize: '14px' } }}
              >
                {modelOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {formData.baseModel && datasetOptions[formData.baseModel] && (
              <FormControl fullWidth variant="outlined">
                <InputLabel>Training Data</InputLabel>
                <Select
                  value={formData.huggingFaceId}
                  onChange={handleInputChange}
                  name="huggingFaceId"
                  label="Training Data"
                  inputProps={{ style: { fontFamily: 'Poppins', fontSize: '14px' } }}
                >
                  {datasetOptions[formData.baseModel].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Button
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              sx={{ backgroundColor: 'MediumSeaGreen', color: '#ffff', fontFamily: 'Poppins', fontSize: '14px', mt: 2 }}
            >
              {showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings
            </Button>

            {showAdvancedSettings && (
              <AdvancedSettings formData={formData} handleCheckboxChange={handleCheckboxChange} handleSliderChange={handleSliderChange} />
            )}

            <Box className="mt-4 flex justify-between space-x-3">
              <Button
                onClick={resetForm}
                sx={{ backgroundColor: 'gray', color: '#ffff', fontFamily: 'Poppins', fontSize: '14px' }}
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                sx={{ backgroundColor: 'black', color: '#ffff', fontFamily: 'Poppins', fontSize: '14px' }}
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

const AlertBox = ({ message, type, onClose }) => (
  <Box className="fixed inset-0 flex justify-center items-center z-50" sx={{ backdropFilter: 'blur(8px)' }}>
    <Box className="w-full max-w-md mx-auto">
      <Box className={`bg-${type === 'error' ? 'red' : 'green'}-100 border border-${type === 'error' ? 'red' : 'green'}-400 text-${type === 'error' ? 'red' : 'green'}-700 px-4 py-3 rounded relative`} role="alert">
        <strong className="font-bold">{type === 'error' ? 'Error!' : 'Success!'}</strong>
        <span className="block sm:inline">{message}</span>
        {onClose && (
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 1 1-1.697 1.697l-2.651-2.65-2.651 2.65a1.2 1.2 0 1 1-1.697-1.697l2.651-2.651-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697l2.651 2.651 2.651-2.651z" />
            </svg>
          </span>
        )}
      </Box>
    </Box>
  </Box>
);

const ProgressBox = () => (
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
);

const AdvancedSettings = ({ formData, handleCheckboxChange, handleSliderChange }) => (
  <Box className="space-y-6 mt-4 bg-gray-200 p-4 rounded-lg">
    <Typography variant="body1">Hyperparameter Tuning</Typography>

    <Box className="space-y-4">
      <Box className="flex flex-col space-y-2">
        <Box className="flex justify-between items-center">
          <Typography variant="body2">Batch size</Typography>
          <Box className="flex items-center">
            <Checkbox checked={formData.batchSizeAuto} onChange={handleCheckboxChange} name="batchSizeAuto" />
            <Typography variant="body2" sx={{ ml: 1 }}>{formData.batchSizeAuto ? 'Auto' : formData.batchSize}</Typography>
          </Box>
        </Box>
        <Slider
          min={1}
          max={100}
          value={formData.batchSize}
          disabled={formData.batchSizeAuto}
          onChange={(e, value) => handleSliderChange('batchSize', value)}
        />
      </Box>

      <Box className="flex flex-col space-y-2">
        <Box className="flex justify-between items-center">
          <Typography variant="body2">Learning rate multiplier</Typography>
          <Box className="flex items-center">
            <Checkbox checked={formData.learningRateAuto} onChange={handleCheckboxChange} name="learningRateAuto" />
            <Typography variant="body2" sx={{ ml: 1 }}>{formData.learningRateAuto ? 'Auto' : formData.learningRateMultiplier}</Typography>
          </Box>
        </Box>
        <Slider
          min={0.1}
          max={10}
          step={0.1}
          value={formData.learningRateMultiplier}
          disabled={formData.learningRateAuto}
          onChange={(e, value) => handleSliderChange('learningRateMultiplier', value)}
        />
        <Typography variant="body2" color="textSecondary">In most cases, range of 0.1-10 is recommended.</Typography>
      </Box>

      <Box className="flex flex-col space-y-2">
        <Box className="flex justify-between items-center">
          <Typography variant="body2">Number of epochs</Typography>
          <Box className="flex items-center">
            <Checkbox checked={formData.numberOfEpochsAuto} onChange={handleCheckboxChange} name="numberOfEpochsAuto" />
            <Typography variant="body2" sx={{ ml: 1 }}>{formData.numberOfEpochsAuto ? 'Auto' : formData.numberOfEpochs}</Typography>
          </Box>
        </Box>
        <Slider
          min={1}
          max={100}
          value={formData.numberOfEpochs}
          disabled={formData.numberOfEpochsAuto}
          onChange={(e, value) => handleSliderChange('numberOfEpochs', value)}
        />
        <Typography variant="body2" color="textSecondary">In most cases, range of 1-10 is recommended.</Typography>
      </Box>
    </Box>
  </Box>
);

export default NewJobModal;
