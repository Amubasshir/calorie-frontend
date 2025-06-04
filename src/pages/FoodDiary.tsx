import React from 'react';
import FoodDiaryComponent from '../components/diary/FoodDiary';

const FoodDiary: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FoodDiaryComponent />
    </div>
  );
};

export default FoodDiary;