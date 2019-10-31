import React from 'react'
import {NavLink} from 'react-router-dom';
import {Table} from 'antd'
import {graphql} from "@apollo/react-hoc";
import {repoTabQuery} from "./queries";

function RepoTab(props) {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => {
                return <NavLink to={`/repo/${text}`}>{text}</NavLink>},
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
    let req, login, repos = null
    // По приходу ответа готовим массив репозиториев и формируем данные
    if(!!props.data.repositoryOwner){
        req = props.data.repositoryOwner.repositories.nodes
        repos = req.map(repo => ({
            ...repo,
            lang: repo.primaryLanguage.name,
            key: repo.id,
        }))
        login = props.data.repositoryOwner.login
    }

    return <div>
        <h1>Repositories by {login}</h1>
        <Table columns={columns} dataSource={repos} pagination={false} loading={!req}/>
    </div>
}
export default graphql(repoTabQuery)(RepoTab) //Реализовал два разных запроса с помощью HOC и hook