import './App.css'
import { v4 as uuidv4 } from 'uuid';
import MultiSelectTailwind from './components/MultiSelectTailwind'

function App() {
  type profileType = {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  const persons: profileType[] = [
    {
     id:uuidv4(),
      name: "John Smith",
      email: "john.smith@email.com",
      image: "/images/person1.jpg",
    },
    {
      id: uuidv4(),
      name: "Emma Johnson",
      email: " emma.johnson@email.com",
      image: "/images/person2.jpg",
    },
    {
      id: uuidv4(),
      name: "James Wilson",
      email: "james.wilson@email.com",
      image: "/images/person3.jpg",
    },
    {
      id: uuidv4(),
      name: "Sarah Davis",
      email: "sarah.davis@email.com",
      image: "/images/person4.jpg",
    },
    {
      id: uuidv4(),
      name: "Michael Taylor",
      email: "michael.taylor@email.com",
      image: "/images/person5.jpg",
    },
    {
      id: uuidv4(),
      name: "Emily Clark",
      email: "emily.clark@email.com",
      image: "/images/person6.jpg",
    },
    {
      id: uuidv4(),
      name: "Robert Turner",
      email: "robert.turner@email.com",
      image: "/images/person7.jpg",
    },
    {
      id: uuidv4(),
      name: "Olivia White",
      email: "olivia.white@email.com",
      image: "/images/person8.jpeg",
    },
    {
      id: uuidv4(),
      name: "William Harris",
      email: "william.harris@email.com",
      image: "/images/person9.jpeg",
    },
    {
      id: uuidv4(),
      name: "Ava Robinson",
      email: "ava.robinson@email.com",
      image: "/images/person3.jpg",
    },
    {
      id: uuidv4(),
      name: "David Miller",
      email: "david.miller@email.com",
      image: "/images/person4.jpg",
    },
    {
      id: uuidv4(),
      name: "Sophia Martin",
      email: "sophia.martin@email.com",
      image: "/images/person5.jpg",
    },
    {
      id: uuidv4(),
      name: "Christopher Hall",
      email: "christopher.hall@email.com",
      image: "/images/person6.jpg",
    },
    {
      id: uuidv4(),
      name: "Amelia Allen",
      email: "amelia.allen@email.com",
      image: "/images/person8.jpeg",
    },
    {
      id: uuidv4(),
      name: "Daniel Carter",
      email: "daniel.carter@email.com",
      image: "/images/person9.jpeg",
    },
    
  ];
  return (
    <>
      <div  className='text-red-500'>
        <MultiSelectTailwind
          persons={persons}
        />
      </div>
    
    </>
  )
}

export default App
