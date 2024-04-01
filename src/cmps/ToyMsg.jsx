import { useState } from "react";
import { addMsg, removeMsg } from "../store/actions/toy.actions";
// import { useSelector } from "react-redux";
import { userService } from "../services/user.service";
import { showErrorMsg } from "../services/event-bus.service";
// import { store } from "../store/store";

export function ToyMsg({ toy, setToy }) {
    const [msg, setMsg] = useState('')
    const loggedInUser = userService.getLoggedinUser()

    function onChangeMsg({ target }) {
        const { value } = target
        setMsg(value)
    }

    async function onSubmitMsg(ev) {
        ev.preventDefault()
        try {
            const message = await addMsg(msg, toy._id)
            setToy(prevToy => ({ ...prevToy, msgs: [...toy.msgs, message] }))
        } catch (err) {
            showErrorMsg('err', err)
        }
    }


    async function onRemoveMsg(messageId) {
        try {
            const msgId = await removeMsg(toy._id, messageId)
            setToy(prevToy => ({ ...prevToy, msgs: toy.msgs.filter(msg => msg.id !== msgId) }))
        } catch (err) {
            showErrorMsg(err)
        }

    }

    return <div>
        {toy.msgs && < ul className="msg-list clean-list" >
            {
                toy.msgs.map(msg => <li key={msg.txt}>
                    {msg.by.fullname}: {msg.txt}
                    {loggedInUser && loggedInUser.isAdmin && <button onClick={() => { onRemoveMsg(msg.id) }}>x</button>}
                </li>
                )
            }
        </ul>}
        {loggedInUser && <form onSubmit={onSubmitMsg}>
            <input type="text"
                placeholder="Enter a message"
                onChange={onChangeMsg}
            />
            <button>submit</button>
        </form>}

    </div>
}