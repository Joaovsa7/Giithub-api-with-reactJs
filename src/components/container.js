import React from 'react'
import { Link } from 'react-router-dom'
import Style from '../styles/style.scss'

const Container = (props) => {
    return(
        <div className="container">
            <div className={`${props.state.anyError === false ? 'hide' : 'show toAnime'}`}>
                { props.state.noInput === true ? <span>O campo não pode estar vazio!</span> : <span>Usuário não encontrado :/ tenta de novo?</span> }
            </div>
            <div id="content">
                <div id="search" className={`${props.estado.showSearch === false ? 'hide' : ''}`}>
                    <input type="text" placeholder="Digite o seu usuário no Github" value={props.state.value}  onChange={props.handleChange} />
                    <button onClick={props.fetchData}>Get user </button>
                </div>     
                {props.children}
                <nav>
                    <div>
                        <Link to="/">Perfil</Link>
                    </div>
                    <div className={`${props.state.showRep === false ? 'hide' : ''}`}>
                        <Link to="/repos">Repositórios</Link>
                    </div>
                </nav>
            </div>
       </div>
    )
}

export default Container;