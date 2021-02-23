import React from 'react';
import axios from "axios";
import LineChart from './Grafica/Line';
import Table from './Table';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            ram_total: 0,
            ram_consumo: 0,
            ram_porcentaje: 0
        };
        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        setInterval(() => {
            this.getData()
        }, 3000);
    }

    getData() {
        axios.get("http://34.67.86.136:9090/ram")
            .then(res => {
                const data = this.state.datas
                let f = new Date()
                const fecha = f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds()
                const newItem = { "title": fecha, "value": res.data.Ramp }
                if (data.length >= 15) {
                    data.reverse()
                    data.pop()
                    data.reverse()
                }
                data.push(newItem)
                this.setState({
                    ...this.state,
                    datas: data,
                    ram_total: res.data.Ramt,
                    ram_consumo: res.data.Ramc,
                    ram_porcentaje: res.data.Ramp
                })
            })
            .catch((e) => {
                console.log("Error", e);
            })
    }

    render() {
        return (
            <div className="container-fluid pb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Información RAM</div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><b>Memoria Total: </b>{this.state.ram_total}</li>
                                <li className="list-group-item"><b>Memoria Usada: </b>{this.state.ram_consumo}</li>
                                <li className="list-group-item"><b>Porcentaje: </b>{this.state.ram_porcentaje}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <LineChart
                            data={this.state.datas}
                            title={"Porcentaje"}
                            color="#2E4053"
                        />
                    </div>
                    <div className="col-md-12">
                        <br /><br />
                        <Table />
                    </div>
                </div>
            </div>
        )
    }
}

export default App