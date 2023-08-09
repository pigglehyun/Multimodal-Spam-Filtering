import React from 'react';
import styled from "styled-components";
import { useState } from 'react';

import "../Page.css"

const Div_txt = styled.div`
    width:50%;
    height:100%;
    float:left;
    border : 1px solid rgb(212, 210, 224);
    align-items : center;
`;

const Div_graph = styled.div`
    width:45%;
    height:50%;
    float:left;
    border:1px solid rgb(212, 210, 224);
`;

const Div_result = styled.div`
    width:45%;
    height:50%;
    float:left;
    border:1px solid rgb(212, 210, 224);
`;


export default function TextPage(props){

  const [selectedSection, setSelectedSection] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [conversionResult, setConversionResult] = useState([{}]);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleConvert = () => {
    fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ section: selectedSection, value: inputValue })
    })
      .then(response => response.json())
      .then(data => {
        // 요청에 대한 응답 처리
        setConversionResult(data);
      })
      .catch(error => {
        setConversionResult("error");
        // 에러 처리
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

    return(

      
        <div
        className='textContainer'
        style={{
            //alignItems : "center",
            textAlign: "center",
            // justifyContent : "center",
            //display : "flex",
            fontSize : "1vw",
            margin : "0.5vw",
            width:"80vw",
            height:"100%",
            // border:"1px solid #0400ff",
            // boxShadow : "0 0 10px 1px #0400ff",
            }}
        >
            <Div_txt>
                <textarea
                  style = {{
                    margin : "10vw 1vw 1vw 1vw",
                    height : "60%",
                    width : "80%",
                  }}
                    placeholder="텍스트를 입력하세요."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button 
                  
                  onClick={handleConvert}>검사하기</button>
            </Div_txt>
            <Div_graph>
                        <div>
                          <h2>NB 결과: {conversionResult.vocabs1}</h2>
                          <h2>SVM 결과: {conversionResult.vocabs2}</h2>
                        </div>
            </Div_graph>
            <Div_result>
            <div className="section">

                    {conversionResult && (
                        <div className="result">
                        <h2>NB 결과: {
                          
                        conversionResult.result1}</h2>
                        <h2>SVM 결과: {
                          
                          conversionResult.result2}</h2>
                        
                      
                        </div>
                    )}
              </div>
        
                
            </Div_result>
        
            
        </div>


    );
}