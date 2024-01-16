import './App.css'
import { v4 as uuidv4 } from 'uuid';
import MultiSelectTailwind from './components/MultiSelectTailwind'
import person1 from "./assets/person1.jpg"
import person2 from "./assets/person2.jpg"
import person3 from "./assets/person3.jpg"
import person4 from "./assets/person4.jpg"
import person5 from "./assets/person5.jpg"
import person6 from "./assets/person6.jpg"
import person7 from "./assets/person7.jpg"
function App() {
// Used uuid for optimization
  const items = [
    { id: uuidv4(), value: "Oliver Turner", icon: person1 },
    { id: uuidv4(), value: "Emily Williams", icon: person2 },
    { id: uuidv4(), value: "Jacob Smith", icon: person3 },
    { id: uuidv4(), value: "Isabella Brown", icon: person4 },
    { id: uuidv4(), value: "William Wilson", icon: person5 },
    { id: uuidv4(), value: "Ava Johnson", icon: person6 },
    { id: uuidv4(), value: "Benjamin Evans", icon: person7 },
    { id: uuidv4(), value: "Emma Brown", icon: person2 },
    { id: uuidv4(), value: "Henry Turner", icon: person4 },
    { id: uuidv4(), value: "Grace Williams", icon: person1 },
  ];
  return (
    <>
      <div  className='text-red-500'>
        <MultiSelectTailwind
          raised={true}
          items={items}
          placeholder="Select an Item"
        />
      </div>
    
    </>
  )
}

export default App
