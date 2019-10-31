import React, {useState} from 'react'
import {Layout, Menu} from 'antd'
import './App.css'
import RepoTab from "./components/RepoTab/RepoTab"
import {Route} from "react-router";
import {NavLink} from 'react-router-dom';
import Repo from "./components/Repo/Repo";

function App() {
    const {Header, Content, Footer} = Layout
    const [current, setCurrent] = useState('')
    const handleClick = (e) => {
        console.log('Click ', e.key)
        setCurrent(e.key)
    }
    return (
        <div className="App">
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        onClick={handleClick}
                        selectedKeys={current}

                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="main">
                            <NavLink to="/">Main</NavLink>
                        </Menu.Item>
                        <Menu.Item key="reps">
                            <NavLink to="/repos">Repositories</NavLink>
                        </Menu.Item>
                        <Menu.Item key="repo">
                            <NavLink to="/repo">Repository</NavLink>
                        </Menu.Item>
                        <Menu.Item key="some" disabled>Some</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        <Route path='/' exact render={() => {
                            setCurrent('main')
                            return <div style={{padding: '10rem', textAlign: 'center'}}><h1>React + GraphQL</h1></div>
                        }}/>
                        <Route path='/repos' render={() => {
                            setCurrent('reps')
                            return <RepoTab/>
                        }}/>
                        <Route path='/repo/:name?' render={() => {
                            setCurrent('repod')
                            return <Repo/>
                        }}/>

                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Design ©2019 Created by ChinaAlpachinoMokachino=)</Footer>
            </Layout>
        </div>
    )
}

export default App
