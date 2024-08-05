import { Download, FileOpenSharp } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';

const DatasetCard = ({ repositoryName, lastUpdated, views, likes }) => {
    return (
        <Card sx={{paddingTop: 1,
            width: 450, height: 70, m: 1,
            background: '#FFFFFF',
            color: '#333',
            cursor: 'pointer',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            }, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4, paddingLeft: 0
        }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 0.3, textAlign: 'left', width: '100%' }}>
                    {repositoryName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 0, marginRight: 2 }}>
                        Updated {lastUpdated}
                    </Typography>
                    <IconButton aria-label="likes" size="small" sx={{ padding: '0 8px' }}>
                        <FileOpenSharp fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {likes}MBs
                        </Typography>
                    </IconButton>
                    <IconButton aria-label="views" size="small" sx={{ padding: '0 8px' }}>
                        <Download fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {views}
                        </Typography>
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default DatasetCard;
