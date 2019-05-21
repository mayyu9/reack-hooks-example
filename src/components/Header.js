import React, {useContext} from 'react';
import AuthContext from '../auth-context';

const Header = props => {

const auth= useContext(AuthContext);
    return( 
        <header>
            {auth.status === true? 
                <button onClick={props.onLoadToDos}>ToDoList</button>
            : null}
            <button onClick={props.onLoadAuth}>Auth</button>
            
        </header>
    )
};

export default Header;