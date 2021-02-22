import axios from "axios"
import { useEffect, useState } from "react"

export default function Table() {
    const [data, setData] = useState([])
    const [info, setInfo] = useState({})

    useEffect(() => {
        axios
            .get('http://34.67.86.136:9090/cpu')
            .then((res) => {
                setData(res.data)
                setInfo(res.data[0])
            })
            .catch((error) => {
                console.log("error", error);
            })
    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        setInfo(data[e.target.value])
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <select className="form-control" onChange={handleChange}>
                    {
                        data.map((item, index) => {
                            return <option key={index} value={index}>{item.Pid} - {item.Nombre}</option>
                        })
                    }
                </select>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>Pid</th>
                            <th>Hid</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            info.Hijo ?
                                info.Hijo.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.Nombre}</td>
                                        <td>{item.Pid}</td>
                                        <td>{item.Hid}</td>
                                        <td>{item.Estado}</td>
                                    </tr>
                                })
                                : null
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">Información</div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>NOMBRE: </b>{info.Nombre}</li>
                        <li className="list-group-item"><b>USUARIO: </b>{info.Usuario}</li>
                        <li className="list-group-item"><b>PID: </b>{info.Pid}</li>
                        <li className="list-group-item"><b>ESTADO: </b>{info.Estado}</li>
                        <li className="list-group-item"><b>RAM: </b>{info.Ram}</li>
                        <li className="list-group-item"><b>HIJOS: </b>{info.Hijo ? info.Hijo.length : 0}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}