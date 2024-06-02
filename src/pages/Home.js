import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { Link } from "react-router-dom";

function Home() {
    const [images, setImages] = useState([]);
    const [textInput, setTextInput] = useState('');
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

    return (
      <div className="App">
          <header className="App-header">
          <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
             
                <div className="upload__image-wrapper">
                  { imageList.length == 0 &&
                    <div>
                      <button
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                        {...dragProps}
                      >
                        Tải ảnh lên
                      </button>
                      &nbsp;
                      {/* <button onClick={onImageRemoveAll}>Xoá ảnh</button> */}
                     </div>
                  }
                  
                 
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image['data_url']} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>Thay đổi</button>
                        <button onClick={() => onImageRemove(index)}>Xoá</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
            
            <label>Lời nhắn bạn muốn gửi tới đại hội là: 
              <input onChange={e => setTextInput(e.target.value)} className="ml-2" type="text" />
            </label>

           
              <Link to="/result" state={{ message: {textInput},img:{images} }}>
                <button>
                  Gửi thông điệp tới đại hội
                </button>
              </Link>
        
          </header>
      </div>
    );
  }
  
  export default Home;