import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { addReview, loadReviews, removeReview } from '../store/actions/review.actions'
import { toyService } from '../services/toy.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'

export function ToyReview({ toy }) {

    // const users = useSelector(storeState => storeState.userModule.users)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const filterBy = { toyId: toy._id }

    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', toyId: toy._id })

    // const dispatch = useDispatch()

    useEffect(() => {
        loadReviews(filterBy)
        // loadUsers()
    }, [])

    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.txt) return alert('All fields are required')
        try {

            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '', toyId: toy._id })
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }

    const onRemove = async reviewId => {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    function canRemove(review) {
        if (!loggedInUser) return false
        return review.userId === loggedInUser._id || loggedInUser.isAdmin
    }

    return (
        <div className="review-index">
            <h1>Reviews:</h1>
            {reviews && <ul className="review-list clean-list">
                {reviews.map(review => (
                    <li key={review._id}>
                        {canRemove(review) &&
                            <button onClick={() => onRemove(review._id)}>X</button>}
                        <h3><pre>{review.txt}</pre></h3>
                        <p>
                            By:
                            <Link to={`/user/${review.user._id}`}>
                                 {review.user.fullname}
                            </Link>
                        </p>
                    </li>
                ))}
            </ul>}
            {/* {users&& */}
            {loggedInUser &&
                <form onSubmit={onAddReview}>

                    <input
                        name="txt"
                        onChange={handleChange}
                        value={reviewToEdit.txt}
                    ></input>
                    <button>Add</button>
                </form>}
            <hr />
        </div>
    )
}




