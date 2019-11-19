import React from 'react';
import ReactDOM from 'react-dom';
// import BaseComponent from '@BaseComponent';

// 首先我们需要导入一些组件...
import {
    // BrowserRouter as AppRouter,
    HashRouter as AppRouter,
    Route,
    Link,
} from 'react-router-dom';

// 然后我们从应用中删除一堆代码和
// 增加一些 <Link> 元素...

const HomePage = () => <div>This is a Home Page</div>;
const LoginPage = () => <div>This is a Login Page</div>;
const RegisterPage = () => <div>This is a Register Page</div>;
const ProfilePage = () => <div>This is a Profile Page</div>;
const AboutPage = () => <div>This is a About Page</div>;
const ContactPage = () => <div>This is a Contact Page</div>;

const BaseLayout = () => (
    <div className="base">
        <header>
            <p>React Router v4 Browser Example</p>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/me">Profile</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
        <div className="container">
            <Route path="/" exact component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/me" component={ProfilePage} />
        </div>
        <footer>
            React Router v4 Browser Example (c) 2017
        </footer>
    </div>
);

const App = () => (
    <AppRouter>
        <BaseLayout />
    </AppRouter>
);
// 最后，我们用一些 <Route> 来渲染 <Router>。
// 这些就是路由提供的我们想要的东西。
ReactDOM.render((
    <App />
), document.getElementById('root'));
