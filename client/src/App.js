
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, } from "./utils/themes";
import styled from 'styled-components';
import ImageUpload from "./Components/ImageUpload";
import ImagesCard from "./Components/ImagesCard";

const Body = styled.div`
display: flex; 
align-items: center;
flex-direction: column;
width: 100vw;
min-height: 100vh;
background-color: ${({ theme }) => theme.bg};
overflow-y: scroll;
`;

const Container = styled.div`
width: 600px;
max-width: 100%;
  display: flex; 
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding: 6% 0% 6% 0%;
`;

const SelectedImages = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;


const Button = styled.div`
  min-height: 48px;
  width: 100%;
  border-radius: 8px;;
  color: ${({ theme }) => theme.soft2};
    font-weight: 600;
    font-size: 16px;
    background: ${({ theme }) => theme.primary};
    color: white;
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

function App() {
  const [images, setImages] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Body>
        <Container>
          <ImageUpload images={images} setImages={setImages} />
          <SelectedImages>
            {images && images.map((image, index) => {
              return (
                <ImagesCard
                  key={index}
                  image={image}
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                />
              );
            })}
          </SelectedImages>
          {images && 
          <Button>Predict</Button>}
        </Container>
      </Body>
    </ThemeProvider>
  );
}

export default App;
