import React, { useRef, useState, useEffect } from 'react';
import { X, Camera, Check } from 'lucide-react';

interface CameraViewProps {
  onClose: () => void;
  onCapture: (imageSrc: string) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCapture, setHasCapture] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setCameraError('Unable to access camera. Please check permissions.');
      }
    };
    
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      setHasCapture(true);
      
      // Stop video stream
      const stream = video.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };
  
  const retakePhoto = () => {
    setHasCapture(false);
    setCapturedImage(null);
    
    // Restart camera
    navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    }).then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }).catch(err => {
      console.error('Error reaccessing camera:', err);
      setCameraError('Unable to restart camera. Please try again.');
    });
  };
  
  const confirmCapture = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-900">
        <h2 className="text-white text-lg font-semibold">Food Recognition</h2>
        <button 
          onClick={onClose}
          className="text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Close camera"
        >
          <X />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {cameraError ? (
          <div className="bg-red-500 text-white p-4 rounded-lg">
            {cameraError}
          </div>
        ) : hasCapture ? (
          <div className="relative w-full max-w-lg">
            <img 
              src={capturedImage || ''} 
              alt="Captured food" 
              className="w-full h-auto rounded-lg object-contain" 
            />
          </div>
        ) : (
          <div className="relative w-full max-w-lg rounded-lg overflow-hidden">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-auto"
            />
            
            {/* Camera overlay guides */}
            <div className="absolute inset-0 border-2 border-white border-opacity-50 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-2 border-green-500 border-dashed rounded-lg"></div>
              </div>
            </div>
            
            <div className="absolute top-4 left-0 right-0 text-center">
              <p className="text-white bg-black bg-opacity-50 inline-block px-4 py-2 rounded-full">
                Position food in the center
              </p>
            </div>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <div className="p-6 bg-gray-900 flex justify-center">
        {hasCapture ? (
          <div className="flex space-x-4">
            <button 
              onClick={retakePhoto}
              className="bg-gray-700 text-white px-6 py-3 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <Camera className="mr-2 h-5 w-5" />
              Retake
            </button>
            <button 
              onClick={confirmCapture}
              className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <Check className="mr-2 h-5 w-5" />
              Confirm
            </button>
          </div>
        ) : (
          <button 
            onClick={captureImage}
            className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            aria-label="Take photo"
          >
            <div className="w-12 h-12 border-2 border-white rounded-full"></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraView;