import React, {useEffect, useState} from "react"
import {withRouter} from "react-router"
import {useQuery} from "@apollo/react-hooks";
import {repoQuery} from "./queries";
import {Descriptions, Spin} from "antd";
import {timeFunc} from "../utils/timeFunc";
import {compose} from "recompose";

const Repo = (props) => {
    // Хуксы загрузки, таймера и данных репозитория
    const [isLoad, setIsLoad] = useState(false)
    const [updateTime, setUpdateTime] = useState('')
    const [repo, setRepo] = useState({})

    // Цепляемся по урлу и делаем запрос
    const name = !!props.match.params.name
        ? props.match.params.name
        : props.history.push('/repos') //Временное решение
    const {data} = useQuery(repoQuery, {variables: {name}}) //Реализовал два разных запроса с помощью hoc и HOOK

    // Component did mount
    useEffect(() => {
        if (!!data) {
            setIsLoad(!!data)
            setRepo(data.repositoryOwner.repository)
        }
    })

    // Раскукоживаем данные о репозиторие
    const {id, description, homepageUrl, nameWithOwner, primaryLanguage, projectsResourcePath, updatedAt} = repo
    const lang = !!primaryLanguage ? primaryLanguage.name : ''

    // Обновления даты изначально и раз в минуту
    if (updateTime === '' && isLoad) setUpdateTime(timeFunc(updatedAt))
    setInterval(() => {
        setUpdateTime(timeFunc(updatedAt))
    }, 60000)

    // Пока нет ответа страницу не грузим
    if (!isLoad)
        return <Spin size="large"/>
    return <div>
        <h1>Repository name: {name}</h1>
        <Descriptions bordered title="Custom Size" size='small'>
            <Descriptions.Item label="ID">{id}</Descriptions.Item>
            <Descriptions.Item label="Home page URL">{homepageUrl || 'None'}</Descriptions.Item>
            <Descriptions.Item label="Name with owner">{nameWithOwner}</Descriptions.Item>
            <Descriptions.Item label="Primary language">{lang}</Descriptions.Item>
            <Descriptions.Item label="Path">{projectsResourcePath}</Descriptions.Item>
            <Descriptions.Item label="Last Update">{updateTime}</Descriptions.Item>
            <Descriptions.Item label="Description">{description}</Descriptions.Item>
        </Descriptions>
    </div>
}
export default compose(withRouter, React.memo)(Repo)