import React from 'react';

export default function Framework(props) {
    const { content, loading } = props;

    function goto(title, href) {
        window.history.pushState({}, title, href);
    }
    return (
        <div>
            <header>
                <nav>
                    <ol>
                        <li><div onClick={() => goto('home', '/')}>home</div></li>
                        <li><div onClick={() => goto('react app', '/open/user/react')}>react16 + antd3</div></li>
                        <li><div onClick={() => goto('vue app', '/open/user/vue')}>vue2 + element2</div></li>
                    </ol>
                </nav>
            </header>
            <li><div onClick={() => goto('home', '/')}>home</div></li>
            { loading ? (<div>loading...</div>) : null }
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
