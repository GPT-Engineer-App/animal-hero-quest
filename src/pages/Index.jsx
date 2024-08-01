import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const animals = [
  { name: 'Cow', image: '/placeholder.svg' },
  { name: 'Dog', image: '/placeholder.svg' },
  { name: 'Cat', image: '/placeholder.svg' },
  { name: 'Horse', image: '/placeholder.svg' },
  { name: 'Pig', image: '/placeholder.svg' },
  { name: 'Sheep', image: '/placeholder.svg' },
  { name: 'Chicken', image: '/placeholder.svg' },
  { name: 'Duck', image: '/placeholder.svg' },
];

const Index = () => {
  const [score, setScore] = useState(0);
  const [currentAnimals, setCurrentAnimals] = useState([]);
  const [correctAnimal, setCorrectAnimal] = useState(null);

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
          <Card key={index} className="p-4">
            <img src={animal.image} alt={animal.name} className="mx-auto object-cover w-32 h-32 mb-4" />
            <Button
              onClick={() => handleAnimalClick(animal)}
              className="w-full"
            >
              {animal.name}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
