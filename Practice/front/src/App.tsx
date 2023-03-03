import styles from './styles/main.module.scss'
import { FC, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

interface Client {
    name: string,
    age: number,
    id: string
}

interface ClientProps extends Client{
    resetClient(s:string): void,
}


const Client: FC<ClientProps> = ({ name, age, id,resetClient }) => {
    return (
        <div className={styles.client}>
            <h1>{name}</h1>
            <h2>{age}</h2>
            <button onClick={() =>resetClient(id)}>Delete</button>
        </div>
    )
}

function App() {
    const [clients, setClients] = useState<Client[]>([])
    const [client, setClient] = useState<Client>({ name: '', age: 22, id:"" })
    console.log(clients)
    const addClient = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', client).then(({ data }) => {
            setClients((prev)=> [...prev, data]);
        })
    }

    const resetAll = () => {
        axios.get('http://localhost:3001/reset').then(() => setClients([]))
    }
    const resetClient = (id:string) => {
        axios.get('http://localhost:3001/reset/' + id).then((data) => {
            setClients((prev) => prev.filter((clients) => clients.id !== id))
        })
    }

    useEffect(() => {
        axios
            .get<Client[]>('http://localhost:3001')
            .then(({ data: clients }) => {
                setClients(clients)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className={styles.main}>
            {clients.length ? (
                clients.map((client, index) => (
                    <Client resetClient={resetClient} key={index} name={client.name} age={client.age} id={client.id}/>
                ))
            ) : (
                <h2>no Clients yet</h2>
            )}
            <form onSubmit={addClient}>
                <input
                    onChange={(e) =>
                        setClient((prev) => ({ ...prev, name: e.target.value}))
                    }
                    type={'text'}
                />
                <input
                    onChange={(e) =>
                        setClient((prev) => ({ ...prev, age: +e.target.value}))
                    }
                    type={'number'}
                />
                <button>add clients</button>
            </form>
            <button onClick={resetAll}>reset all client</button>
        </div>
    )
}

export default App
