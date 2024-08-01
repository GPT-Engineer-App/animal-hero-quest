import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const animals = [
  { name: 'Cow', image: 'https://source.unsplash.com/featured/?cow' },
  { name: 'Dog', image: 'https://source.unsplash.com/featured/?dog' },
  { name: 'Cat', image: 'https://source.unsplash.com/featured/?cat' },
  { name: 'Horse', image: 'https://source.unsplash.com/featured/?horse' },
  { name: 'Pig', image: 'https://source.unsplash.com/featured/?pig' },
  { name: 'Sheep', image: 'https://source.unsplash.com/featured/?sheep' },
  { name: 'Chicken', image: 'https://source.unsplash.com/featured/?chicken' },
  { name: 'Duck', image: 'https://source.unsplash.com/featured/?duck' },
];

const Index = () => {
  const [score, setScore] = useState(0);
  const [currentAnimals, setCurrentAnimals] = useState([]);
  const [correctAnimal, setCorrectAnimal] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const selectRandomAnimals = () => {
    const shuffled = [...animals].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const startNewRound = () => {
    const newAnimals = selectRandomAnimals();
    setCurrentAnimals(newAnimals);
    setCorrectAnimal(newAnimals[Math.floor(Math.random() * newAnimals.length)]);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleAnimalClick = (animal) => {
    if (animal.name === correctAnimal.name) {
      setScore(score + 1);
    }
    startNewRound();
    setLoadedImages({});
  };

  const handleImageLoad = (animalName) => {
    setLoadedImages(prev => ({ ...prev, [animalName]: true }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Animal Selection Game</h1>
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">Score: {score}</p>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">Select the {correctAnimal?.name}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {currentAnimals.map((animal, index) => (
          <Card 
            key={index} 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAnimalClick(animal)}
          >
            <div className="w-full h-48 overflow-hidden rounded-lg relative">
              {!loadedImages[animal.name] && (
                <Skeleton className="absolute inset-0" />
              )}
              <img 
                src={animal.image} 
                alt={animal.name} 
                className="mx-auto object-cover w-full h-full" 
                onLoad={() => handleImageLoad(animal.name)}
                style={{ display: loadedImages[animal.name] ? 'block' : 'none' }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
