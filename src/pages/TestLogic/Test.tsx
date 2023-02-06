/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

<<<<<<< HEAD
const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = info => {
    console.log('infor', info);

    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: true,
  };
  return (
    <Upload {...props} fileList={fileList}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default App;
=======
const Test = () => {
  // html, body {
  //   height: 100%;
  // }

  // .wrap {
  //   height: 100%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }

  // .button {
  //   min-width: 300px;
  //   min-height: 60px;
  //   font-family: 'Nunito', sans-serif;
  //   font-size: 22px;
  //   text-transform: uppercase;
  //   letter-spacing: 1.3px;
  //   font-weight: 700;
  //   color: #313133;
  //   background: #4FD1C5;
  // background: linear-gradient(90deg, rgba(129,230,217,1) 0%, rgba(79,209,197,1) 100%);
  //   border: none;
  //   border-radius: 1000px;
  //   box-shadow: 12px 12px 24px rgba(79,209,197,.64);
  //   transition: all 0.3s ease-in-out 0s;
  //   cursor: pointer;
  //   outline: none;
  //   position: relative;
  //   padding: 10px;
  //   }

  // button::before {
  // content: '';
  //   border-radius: 1000px;
  //   min-width: calc(300px + 12px);
  //   min-height: calc(60px + 12px);
  //   border: 6px solid #00FFCB;
  //   box-shadow: 0 0 60px rgba(0,255,203,.64);
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   opacity: 0;
  //   transition: all .3s ease-in-out 0s;
  // }

  // .button:hover, .button:focus {
  //   color: #313133;
  //   transform: translateY(-6px);
  // }

  // button:hover::before, button:focus::before {
  //   opacity: 1;
  // }

  // button::after {
  //   content: '';
  //   width: 30px; height: 30px;
  //   border-radius: 100%;
  //   border: 6px solid #00FFCB;
  //   position: absolute;
  //   z-index: -1;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   animation: ring 1.5s infinite;
  // }

  // button:hover::after, button:focus::after {
  //   animation: none;
  //   display: none;
  // }

  // @keyframes ring {
  //   0% {
  //     width: 30px;
  //     height: 30px;
  //     opacity: 1;
  //   }
  //   100% {
  //     width: 300px;
  //     height: 300px;
  //     opacity: 0;
  //   }
  // }
  //   const list = [
  //     'Brian Vaughn',
  //     // And so on...
  //   ];
  //   function rowRenderer({
  //     key, // Unique key within array of rows
  //     index, // Index of row within collection
  //     isScrolling, // The List is currently being scrolled
  //     isVisible, // This row is visible within the List (eg it is not an overscanned row)
  //     style, // Style object to be applied to row (to position it)
  //   }) {
  //     return (
  //       <div key={key} style={style}>
  //         {list[index]}
  //       </div>
  //     );
  //   }
  //   return <div> <List width={300} height={300} rowCount={list.length} rowHeight={20} rowRenderer={rowRenderer} />,</div>;
  return <div></div>;
};

export default Test;
// Result Skip Results Iframe
// EDIT ON
// <div id="load">
//   <div>G</div>
//   <div>N</div>
//   <div>I</div>
//   <div>D</div>
//   <div>A</div>
//   <div>O</div>
//   <div>L</div>
// </div>
// body {
//   background:#000;
// }

// #load {
//   position:absolute;
//   width:600px;
//   height:36px;
//   left:50%;
//   top:40%;
//   margin-left:-300px;
//   overflow:visible;
//   -webkit-user-select:none;
//   -moz-user-select:none;
//   -ms-user-select:none;
//   user-select:none;
//   cursor:default;
// }

// #load div {
//   position:absolute;
//   width:20px;
//   height:36px;
//   opacity:0;
//   font-family:Helvetica, Arial, sans-serif;
//   animation:move 2s linear infinite;
//   -o-animation:move 2s linear infinite;
//   -moz-animation:move 2s linear infinite;
//   -webkit-animation:move 2s linear infinite;
//   transform:rotate(180deg);
//   -o-transform:rotate(180deg);
//   -moz-transform:rotate(180deg);
//   -webkit-transform:rotate(180deg);
//   color:#35C4F0;
// }

// #load div:nth-child(2) {
//   animation-delay:0.2s;
//   -o-animation-delay:0.2s;
//   -moz-animation-delay:0.2s;
//   -webkit-animation-delay:0.2s;
// }
// #load div:nth-child(3) {
//   animation-delay:0.4s;
//   -o-animation-delay:0.4s;
//   -webkit-animation-delay:0.4s;
//   -webkit-animation-delay:0.4s;
// }
// #load div:nth-child(4) {
//   animation-delay:0.6s;
//   -o-animation-delay:0.6s;
//   -moz-animation-delay:0.6s;
//   -webkit-animation-delay:0.6s;
// }
// #load div:nth-child(5) {
//   animation-delay:0.8s;
//   -o-animation-delay:0.8s;
//   -moz-animation-delay:0.8s;
//   -webkit-animation-delay:0.8s;
// }
// #load div:nth-child(6) {
//   animation-delay:1s;
//   -o-animation-delay:1s;
//   -moz-animation-delay:1s;
//   -webkit-animation-delay:1s;
// }
// #load div:nth-child(7) {
//   animation-delay:1.2s;
//   -o-animation-delay:1.2s;
//   -moz-animation-delay:1.2s;
//   -webkit-animation-delay:1.2s;
// }

// @keyframes move {
//   0% {
//     left:0;
//     opacity:0;
//   }
//   35% {
//     left: 41%;
//     -moz-transform:rotate(0deg);
//     -webkit-transform:rotate(0deg);
//     -o-transform:rotate(0deg);
//     transform:rotate(0deg);
//     opacity:1;
//   }
//   65% {
//     left:59%;
//     -moz-transform:rotate(0deg);
//     -webkit-transform:rotate(0deg);
//     -o-transform:rotate(0deg);
//     transform:rotate(0deg);
//     opacity:1;
//   }
//   100% {
//     left:100%;
//     -moz-transform:rotate(-180deg);
//     -webkit-transform:rotate(-180deg);
//     -o-transform:rotate(-180deg);
//     transform:rotate(-180deg);
//     opacity:0;
//   }
// }

// @-moz-keyframes move {
//   0% {
//     left:0;
//     opacity:0;
//   }
//   35% {
//     left:41%;
//     -moz-transform:rotate(0deg);
//     transform:rotate(0deg);
//     opacity:1;
//   }
//   65% {
//     left:59%;
//     -moz-transform:rotate(0deg);
//     transform:rotate(0deg);
//     opacity:1;
//   }
//   100% {
//     left:100%;
//     -moz-transform:rotate(-180deg);
//     transform:rotate(-180deg);
//     opacity:0;
//   }
// }

// @-webkit-keyframes move {
//   0% {
//     left:0;
//     opacity:0;
//   }
//   35% {
//     left:41%;
//     -webkit-transform:rotate(0deg);
//     transform:rotate(0deg);
//     opacity:1;
//   }
//   65% {
//     left:59%;
//     -webkit-transform:rotate(0deg);
//     transform:rotate(0deg);
//     opacity:1;
//   }
//   100% {
//     left:100%;
//     -webkit-transform:rotate(-180deg);
//     transform:rotate(-180deg);
//     opacity:0;
//   }
// }

// @-o-keyframes move {
//   0% {
//     left:0;
//     opacity:0;
//   }
//   35% {
//     left:41%;
//     -o-transform:rotate(0deg);
//     transform:rotate(0deg);
//     opacity:1;
//   }
//   65% {
//     left:59%;
//     -o-transform:rotate(0deg);
//     transform:rotate(0deg);
//     opacity:1;
//   }
//   100% {
//     left:100%;
//     -o-transform:rotate(-180deg);
//     transform:rotate(-180deg);
//     opacity:0;
//   }
// }

// Resources
>>>>>>> 25b04a83b316a7da17a90899433bbe4ad564ac4d
