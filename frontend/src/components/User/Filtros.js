import React from 'react';
import agent from '../../agent';

const Filtros = props => {

    const handleClickAll = e => {
        e.preventDefault();
        props.onClickFiltro(Promise.all([
                agent.Users.findOne(props.username, 3, 0, {}),
                agent.Users.findAllFirends(props.username, {})
            ]),
            {},
        );
    };

    const handleClickLocality = e => {
        e.preventDefault();
        props.onClickFiltro(Promise.all([
                agent.Users.findOne(props.username, 3, 0, { locality: "Ontinyent" }),
                agent.Users.findAllFirends(props.username, { locality: "Ontinyent" })
            ]),
            { locality: "Ontinyent" },
        );
    };

    const handleClickBirthDay = e => {
        e.preventDefault();
        props.onClickFiltro(Promise.all([
                agent.Users.findOne(props.username, 3, 0, { birthDay: String(new Date().getDate() + "/" + parseInt(new Date().getMonth()+1)) }),
                agent.Users.findAllFirends(props.username, { birthDay: String(new Date().getDate() + "/" + parseInt(new Date().getMonth()+1)) })
            ]),
            { birthDay: String(new Date().getDate() + "/" + parseInt(new Date().getMonth()+1)) },
        );
    };

    return (
        <div className="tag-list">
            <h1>Find by...</h1>
            <a
                href=""
                className="tag-default tag-pill"
                onClick={handleClickAll}> All
            </a>
            <a
                href=""
                className="tag-default tag-pill"
                onClick={handleClickLocality}> Close to me
            </a>
            <a
                href=""
                className="tag-default tag-pill"
                onClick={handleClickBirthDay}> BirthDay
            </a>            
        </div>
    );
};

export default Filtros;
