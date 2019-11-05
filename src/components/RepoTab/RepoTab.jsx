import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom';
import {Table} from 'antd'
import {graphql} from "@apollo/react-hoc";
import {repoTabQuery} from "./queries";

function RepoTab(props) {
    const [isLoad, setIsLoad] = useState(false)
    const [login, setLogin] = useState('')
    const [repos, setRepos] = useState([])
    // По приходу ответа готовим массив репозиториев и формируем данные
    useEffect(() => {
        setIsLoad(!!props.data.repositoryOwner)
    })
    // По приходу ответа готовим массив репозиториев и формируем данные
    useEffect(() => {
        if (isLoad) {
            const req = props.data.repositoryOwner.repositories.nodes
            const repos = req.map(repo => ({
                ...repo,
                lang: !!repo.primaryLanguage ? repo.primaryLanguage.name : '',
                key: repo.id,
            }))
            setRepos(repos)
            setLogin(props.data.repositoryOwner.login)
        }
    }, [isLoad])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => {
                return <NavLink to={`/repo/${text}`}>{text}</NavLink>
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Primary Language',
            dataIndex: 'lang',
            key: 'lang',
        },
    ]
    return <div>
        <h1>Repositories by {login}</h1>
        <Table columns={columns} dataSource={repos} pagination={false} loading={!isLoad}/>
    </div>
}

export default graphql(repoTabQuery)(RepoTab) //Реализовал два разных запроса с помощью HOC и hook