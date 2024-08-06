import { Dataset } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Grid, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import React, { useState } from 'react';
import DatasetCard from '../widgets/DatasetCard';
import DatasetModal from '../widgets/DatasetModal';
import { Footer } from '../widgets/Footer';
import Navbar from './Navbar';

const datasets = [
    { name: "argilla/magpie-ultra-v0.1", updated: "about 2 hours ago", views: "50k", likes: "108" },
    { name: "AI-MO/NuminaMath-CoT", updated: "17 days ago", views: "860k", likes: "141" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "AI-MO/NuminaMath-CoT", updated: "17 days ago", views: "860k", likes: "141" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "AI-MO/NuminaMath-CoT", updated: "17 days ago", views: "860k", likes: "141" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "AI-MO/NuminaMath-CoT", updated: "17 days ago", views: "860k", likes: "141" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "AI-MO/NuminaMath-CoT", updated: "17 days ago", views: "860k", likes: "141" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "AI-MO/NuminaMath-CoT", updated: "17 days ago", views: "860k", likes: "141" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "AI-MO/NuminaMath-CoT", updated: "17 days ago", views: "860k", likes: "141" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" },
    { name: "HuggingFaceTB/smollm-corpus", updated: "20 days ago", views: "237M", likes: "157" }
    // Add more datasets as needed
]

const Datasets = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const [selectedChips, setSelectedChips] = useState({
        publicDatasets: false,
        yourDatasets: false,
        csv: false,
        xlsx: false,
    });

    const handleChipToggle = (chip) => {
        setSelectedChips((prev) => {
            let updatedChips = { ...prev };

            // Enforce exclusive selection for "Public Datasets" and "Your Datasets"
            if (chip === 'publicDatasets') {
                updatedChips.publicDatasets = !prev.publicDatasets;
                if (updatedChips.publicDatasets) {
                    updatedChips.yourDatasets = false;
                }
            } else if (chip === 'yourDatasets') {
                updatedChips.yourDatasets = !prev.yourDatasets;
                if (updatedChips.yourDatasets) {
                    updatedChips.publicDatasets = false;
                }
            } else {
                updatedChips[chip] = !prev[chip];
            }

            return updatedChips;
        });
    };

    return (
        <>
            <Navbar />
            <Box
                className="min-h-screen bg-gray-100"
                sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    minHeight: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'column',
                }}
            >
                <Container maxWidth="xl" sx={{ mt: 0.1, mb: 4 }}>
                    <Toolbar />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Datasets
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Explore, analyze, and share quality data. Learn more about data types, creating, and collaborating.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>


                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#a777e3' }}
                            startIcon={<Dataset />}
                            onClick={() => setModalOpen(true)} // Open the modal
                        >
                            Add New Dataset
                        </Button>
                        <DatasetModal open={modalOpen} onClose={() => setModalOpen(false)} />

                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search datasets"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                        <Chip
                            label="Public Datasets"
                            variant="outlined"
                            onClick={() => handleChipToggle('publicDatasets')}
                            sx={{
                                backgroundColor: selectedChips.publicDatasets ? '#a777e3' : 'transparent',
                                color: selectedChips.publicDatasets ? 'white' : 'inherit',
                            }}
                        />
                        <Chip
                            label="Your Datasets"
                            variant="outlined"
                            onClick={() => handleChipToggle('yourDatasets')}
                            sx={{
                                backgroundColor: selectedChips.yourDatasets ? '#a777e3' : 'transparent',
                                color: selectedChips.yourDatasets ? 'white' : 'inherit',
                            }}
                        />
                        <Chip
                            label="CSV"
                            variant="outlined"
                            onClick={() => handleChipToggle('csv')}
                            sx={{
                                backgroundColor: selectedChips.csv ? '#a777e3' : 'transparent',
                                color: selectedChips.csv ? 'white' : 'inherit',
                            }}
                        />
                        <Chip
                            label="XLSX"
                            variant="outlined"
                            onClick={() => handleChipToggle('xlsx')}
                            sx={{
                                backgroundColor: selectedChips.xlsx ? '#a777e3' : 'transparent',
                                color: selectedChips.xlsx ? 'white' : 'inherit',
                            }}
                        />
                    </Box>
                    <Grid container spacing={0.05}>
                        {datasets.map((dataset, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                                <DatasetCard
                                    repositoryName={dataset.name}
                                    lastUpdated={dataset.updated}
                                    views={dataset.views}
                                    likes={dataset.likes}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Datasets;
