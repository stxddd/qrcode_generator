import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { HexColorPicker } from "react-colorful";
import { download } from './utils/downloadQR';

import './App.css';

function App() {
    const [qrText, setQrText] = useState('https://github.com/stxddd')

    const [bgColor, setBgColor] = useState("#09090B");
    const [fgColor, setFgColor] = useState("#FAFAFA");
    const [isBgPickerOpen, setIsBgPickerOpen] = useState(false);
    const [isFgPickerOpen, setIsFgPickerOpen] = useState(false);

    const bgPickerRef = useRef(null);
    const fgPickerRef = useRef(null);

    return (
    <div className='container'>
        <div className='content'>
            <h1 className='title' >Получи QR <span className="highlight">быстро и бесплатно!</span></h1>
            <input placeholder='Введите ссылку/текст' onChange={(e) => setQrText(e.target.value)} className='text-input'/>
            <div className="color-section">
            <div className="color-pciker_items">
                <div className="color-pciker_item" ref={bgPickerRef}>
                    <label className="color-pciker_label">Задний</label>
                    <div className="input-container">
                        <input
                            value={bgColor}
                            onChange={(e) =>setBgColor(`#${e.target.value.replace(/[^a-fA-F0-9]/g, '')}`)}
                            className="input"
                            maxLength="7"/>
                        <button className="bg-picker-btn"onClick={() => setIsBgPickerOpen(!isBgPickerOpen)}>🎨</button>
                    </div>
                    {isBgPickerOpen && (
                        <HexColorPicker
                            color={bgColor}
                            onChange={setBgColor}
                            className="color-pciker"/>)}
                </div>

                <div className="color-pciker_item" ref={fgPickerRef}>
                    <label className="color-pciker_label">Передний</label>
                    <div className="input-container">
                        <input
                            value={fgColor}
                            onChange={(e) =>setFgColor(`#${e.target.value.replace(/[^a-fA-F0-9]/g, '')}`)}
                            className="input"
                            maxLength="7"/>
                        <button className="fg-picker-btn" onClick={() => setIsFgPickerOpen(!isFgPickerOpen)}>🎨</button>
                    </div>
                    {isFgPickerOpen && (
                        <HexColorPicker
                            color={fgColor}
                            onChange={setFgColor}
                            className="color-pciker"
                        />
                    )}
                </div>
            </div>
            <button className="btn" onClick={()=>{
                setBgColor('#FAFAFA')
                setFgColor('#09090B')}}>Сбросить</button>
        </div>
            <div className='qr-setction' >
                <QRCodeSVG className='result'
                bgColor = {bgColor}
                fgColor = {fgColor}
                size = {600} 
                value={qrText}/>
            </div>
            <button onClick={download} className='btn download-btn'>Скачать</button>
        </div>
    </div>
  );
}

export default App;
