import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const animals = [
  { name: 'Cow', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg' },
  { name: 'Dog', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cute_dog.jpg/640px-Cute_dog.jpg' },
  { name: 'Cat', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg' },
  { name: 'Horse', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Nokota_Horses_cropped.jpg/640px-Nokota_Horses_cropped.jpg' },
  { name: 'Pig', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Pink_pig_sus_scrofa_domesticus.jpg/640px-Pink_pig_sus_scrofa_domesticus.jpg' },
  { name: 'Sheep', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flock_of_sheep.jpg/640px-Flock_of_sheep.jpg' },
  { name: 'Chicken', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/%E0%B0%95%E0%B1%8B%E0%B0%A1%E0%B0%BF_%E0%B0%AA%E0%B0%BF%E0%B0%B2%E0%B1%8D%E0%B0%B2IMG20191207080730-01.jpg/640px-%E0%B0%95%E0%B1%8B%E0%B0%A1%E0%B0%BF_%E0%B0%AA%E0%B0%BF%E0%B0%B2%E0%B1%8D%E0%B0%B2IMG20191207080730-01.jpg' },
  { name: 'Duck', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bucephala-albeola-010.jpg/640px-Bucephala-albeola-010.jpg' },
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
          <Card 
            key={index} 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAnimalClick(animal)}
          >
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <img src={animal.image} alt={animal.name} className="mx-auto object-cover w-full h-full" />
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <Tabs defaultValue="cow" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="cow">Cow</TabsTrigger>
            <TabsTrigger value="dog">Dog</TabsTrigger>
            <TabsTrigger value="cat">Cat</TabsTrigger>
            <TabsTrigger value="horse">Horse</TabsTrigger>
          </TabsList>
          <TabsContent value="cow">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-2">Cow</h3>
              <p>Cows are domesticated cattle known for producing milk and meat. They are herbivores and have a complex digestive system with four stomachs.</p>
            </Card>
          </TabsContent>
          <TabsContent value="dog">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-2">Dog</h3>
              <p>Dogs are domesticated mammals, known as man's best friend. They come in various breeds and are often kept as pets or working animals.</p>
            </Card>
          </TabsContent>
          <TabsContent value="cat">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-2">Cat</h3>
              <p>Cats are small carnivorous mammals that are often kept as house pets. They are known for their independent nature and grooming habits.</p>
            </Card>
          </TabsContent>
          <TabsContent value="horse">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-2">Horse</h3>
              <p>Horses are large domesticated mammals used for transportation, sport, and work. They are herbivores and have been companions to humans for thousands of years.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
