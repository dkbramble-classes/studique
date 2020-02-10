var React = require('react');
var Dropdown = require('react-simple-dropdown');
var DropdownTrigger = Dropdown.DropdownTrigger;
var DropdownContent = Dropdown.DropdownContent;
 
class Menu extends Component {
    render() {
        return (
            <Dropdown>
                <DropdownTrigger>Profile</DropdownTrigger>
                <DropdownContent>
                    <img src="avatar.jpg" /> Username
                    <ul>
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <a href="/favorites">Favorites</a>
                        </li>
                        <li>
                            <a href="/logout">Log Out</a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
        );
    }
}
export default Menu;