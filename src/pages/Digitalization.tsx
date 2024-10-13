import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, RefreshCw, Download, Play, Image as ImageIcon, Tag } from 'lucide-react';

interface ImageItem {
  id: string;
  file: File;
  preview: string;
  type: 'exhibit' | 'label';
  title: string;
}

interface MatchedPair {
  exhibitId: string;
  labelId: string;
}

const Digitalization: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<MatchedPair[]>([]);
  const [excelPreview, setExcelPreview] = useState<string[][]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragCounter = useRef(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.name.toLowerCase().includes('label') ? 'label' : 'exhibit',
      title: file.name,
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    // Clean up the preview URLs when the component unmounts
    return () => images.forEach(image => URL.revokeObjectURL(image.preview));
  }, [images]);

  const handleAutoMatch = () => {
    // Implement AI auto-matching logic here
    console.log('Auto-matching...');
    // For now, let's just randomly match labels to exhibits
    const exhibits = images.filter(img => img.type === 'exhibit');
    const labels = images.filter(img => img.type === 'label');
    const newMatchedPairs = exhibits.map((exhibit, index) => ({
      exhibitId: exhibit.id,
      labelId: labels[index % labels.length].id,
    }));
    setMatchedPairs(newMatchedPairs);
  };

  const handleProcessImages = () => {
    const data = matchedPairs.map(pair => {
      const exhibit = images.find(img => img.id === pair.exhibitId);
      const label = images.find(img => img.id === pair.labelId);
      return [exhibit?.file.name, label?.title, exhibit?.preview];
    });
    setExcelPreview([['File Name', 'Title', 'Image URL'], ...data]);
  };

  const handleExportExcel = () => {
    // Placeholder for Excel export functionality
    console.log('Exporting to Excel...');
  };

  const handleStartTraining = () => {
    // Implement AI training logic here
    console.log('Starting AI training...');
  };

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      // Reset any drag-related state here if needed
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    
    if (draggingId && targetId) {
      const draggedImage = images.find(img => img.id === draggingId);
      const targetImage = images.find(img => img.id === targetId);
      
      if (draggedImage?.type === 'label' && targetImage?.type === 'exhibit') {
        setMatchedPairs(prev => [
          ...prev.filter(pair => pair.exhibitId !== targetId),
          { exhibitId: targetId, labelId: draggingId }
        ]);
      }
    }
    
    setDraggingId(null);
  };

  const isAllMatched = images.length > 0 && matchedPairs.length === images.filter(img => img.type === 'exhibit').length;

  const getMatchedLabel = (exhibitId: string) => {
    const pair = matchedPairs.find(p => p.exhibitId === exhibitId);
    return pair ? images.find(img => img.id === pair.labelId) : null;
  };

  const toggleImageType = (id: string) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === id
          ? { ...img, type: img.type === 'exhibit' ? 'label' : 'exhibit' }
          : img
      )
    );
    // Remove any existing matches for this image
    setMatchedPairs(prev => prev.filter(pair => pair.exhibitId !== id && pair.labelId !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Digitalization</h1>
      
      <div 
        {...getRootProps()} 
        className={`
          border-2 border-dashed rounded-lg p-10 mb-8 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        {isDragActive ? (
          <p className="text-lg text-blue-500">Drop the files here ...</p>
        ) : (
          <p className="text-lg text-gray-500">Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="mb-8">
          <button
            onClick={handleAutoMatch}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            <RefreshCw className="inline-block mr-2" />
            Automatch
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {images.map((image) => (
          <div
            key={image.id}
            className={`
              bg-white rounded-lg shadow-md overflow-hidden
              transform transition-all duration-300 ease-in-out
              ${image.type === 'label' ? 'hover:scale-105 cursor-move' : 'hover:shadow-lg'}
            `}
            draggable={image.type === 'label'}
            onDragStart={() => handleDragStart(image.id)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, image.id)}
          >
            <img src={image.preview} alt={image.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm font-semibold mb-2 truncate">{image.title}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleImageType(image.id)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${image.type === 'exhibit' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}
                    hover:opacity-80 transition-opacity duration-300
                  `}
                >
                  <ImageIcon className="inline-block mr-1" size={12} />
                  Exhibit
                </button>
                <button
                  onClick={() => toggleImageType(image.id)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${image.type === 'label' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}
                    hover:opacity-80 transition-opacity duration-300
                  `}
                >
                  <Tag className="inline-block mr-1" size={12} />
                  Label
                </button>
              </div>
              {image.type === 'exhibit' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Matched Label:</p>
                  <p className="text-sm truncate">{getMatchedLabel(image.id)?.title || 'None'}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleProcessImages}
          className={`
            px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300
            ${isAllMatched 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
          disabled={!isAllMatched}
        >
          Process Images
        </button>
      </div>

      {excelPreview.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Excel Preview</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {excelPreview[0].map((header, index) => (
                    <th key={index} className="border border-gray-300 p-2 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelPreview.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 p-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleExportExcel}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              <Download className="inline-block mr-2" />
              Export to Excel
            </button>
            <button
              onClick={handleStartTraining}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-purple-600 transition-colors duration-300"
            >
              <Play className="inline-block mr-2" />
              Start Training
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Digitalization;