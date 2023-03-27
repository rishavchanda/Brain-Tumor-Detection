import { prepareCssVars } from '@mui/system';
import React from 'react'
import styled from 'styled-components';
import { useTheme } from 'styled-components';

const Container = styled.div`
    height: 150px;
    background-color: ${({ theme }) => theme.card};
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #0000001a;
    padding: 12px;
    display: flex;
    gap: 14px;
    flex-direction: row;
    @media (max-width: 430px) {
        flex-direction: column;
        height: fit-content;
    }
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.02);
    }
`
const Image = styled.img`
    height: 100%;
    @media (max-width: 430px) {
      height: 100%
    }
    object-fit: cover;
    ${({ theme, prediction }) =>  prediction ? `border: 1px solid ${theme.green}` : `border: 1px solid ${theme.pink}` };
    ;
    border-radius: 12px;
`
const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 500;
    ${({ theme, prediction }) =>  prediction ? `color: ${theme.green+'dd'}` : `color: ${theme.pink+'dd'}` };
`

const Description = styled.div`
    font-size: 15px;
    font-weight: 400;
    ${({ theme, prediction }) =>  prediction ? `color: ${theme.green+'aa'}` : `color: ${theme.pink+'aa'}` };
`
const File = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
`
const Probablity = styled.div`
    font-size: 17px;
    font-weight: 600;
    margin-top: 10px;
    ${({ theme, prediction }) =>  prediction ? `color: ${theme.green+'ee'}` : `color: ${theme.pink+'ee'}` };
`;


const ResultCard = ({image,prediction}) => {
    var probablity = prediction*100
    if(probablity>50){
        prediction = 1
    }
    else if(probablity<50){
        prediction = 0
        probablity = 100.000 - probablity
    }
    return (
        <Container>
            <Image prediction={!prediction} src={image.base64_file} alt="image" />
            <Body>
                <Title prediction={!prediction}>{!prediction ? "No Tumor Detected" : "Tumor Detected"}</Title>
                <Description  prediction={!prediction}>{!prediction ? "According to our prediction on basis of our ML model there is a possibility on no tumor detected in the image.": "According to our prediction on basis of our ML model there is a possibility on tumor detected in the image." }</Description>
                <File>File: {image.file_name}</File>
                <Probablity  prediction={!prediction}>Accuracy: {Math.round(probablity*100)/100}%</Probablity>
            </Body>
        </Container>
    )
}

export default ResultCard