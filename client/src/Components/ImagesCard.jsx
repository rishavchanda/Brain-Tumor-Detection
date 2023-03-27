import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-item: center;
    border: 2px dashed  ${({ theme }) => theme.soft};
    border-radius: 12px;
    color: ${({ theme }) => theme.soft};
    padding: 4px;
    color: ${({ theme }) => theme.soft};
`;

const Image = styled.img`
    width: 140px;
    height: 140px;
    object-fit: fill;
    border-radius: 12px;
`;

const ImageText = styled.div`
    text-align: center;
    padding: 4px;
    font-weight: 500;
`;

const ImagesCard = ({ image }) => {
    return (
        <Container>
            <Image src={image.base64_file} />
            <ImageText>{image.file_name}</ImageText>
        </Container>
    )
}

export default ImagesCard