import React, {useState} from "react"
import {withRouter} from "react-router"
import {useQuery} from "@apollo/react-hooks";
import {repoQuery} from "./queries";
import {Descriptions, Spin} from "antd";
import {timeFunc} from "../utils/timeFunc";
import {compose} from "recompose";

const Repo = (props) => {
    // Хук=)
    const [updateTime, setUpdateTime] = useState('')

    // Цепляемся по урлу и делаем запрос
    const name = !!props.match.params.name
        ? props.match.params.name
        : props.history.push('/repos') //Временное решение
    const {data} = useQuery(repoQuery, {variables: {name}}) //Реализовал два разных запроса с помощью hoc и HOOK
    let isLoad = !!data

    // Тащим данные из ответа
    const {id, description, homepageUrl, nameWithOwner, primaryLanguage, projectsResourcePath, updatedAt}
        = !!isLoad ? data.repositoryOwner.repository : ''
    const lang = !!primaryLanguage ? primaryLanguage.name : ''
    console.log(updatedAt)
    // Обновления даты раз в минуту
    if (updateTime === '' && isLoad) setUpdateTime(timeFunc(updatedAt))
    setInterval(() => {
        setUpdateTime(timeFunc(updatedAt))
        debugger
        console.log(updatedAt)
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