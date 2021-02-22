import axios from "axios";
import Line from './Grafica/Line';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    // getData()
    setInterval(() => {
      // const val = getData()
      getData()
    }, 3000);
  }, [])

  const getData = () => {
    axios.get("http://34.67.86.136:9090/ram")
    .then((res)=>{
      
    })
      // .then((res) => {
      //   const d = data
      //   let f = new Date()
      //   const fecha = f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds()
      //   d.push({"title":fecha,"value":res.data.Ramp})
      //   // setTitles([...titles, contador.toString()])
      //   // setValues([...values, res.data.Ramp])
      //   // setContador(contador+1)
      //   // lol.push(res.data.Ramp)
      //   // lol2.push('')
      //   // setTitles(lol2)
      //   // setValues(lol)
      //   // console.log(data);
      //   setData(d)
      // })
      .catch((e) => {
        console.log("Error",e);
      })
  }

  return (
    <div className="container-fluid">
      <Line
        data = {data}
        values={[]}
        titles={[]}
      />
    </div>
  );
}

export default App;
