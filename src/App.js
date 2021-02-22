import React from 'react';
import axios from "axios";
import LineChart from './Grafica/Line';
import Table from './Table';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: []
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
                    datas: data
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
                    <div className="col-md-6 offset-3">
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