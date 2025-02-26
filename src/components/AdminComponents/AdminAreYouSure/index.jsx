import './index.scss';

function AdminAreYouSure({ onCancel, onRefund }) {
    return (
        <section id="adminAreYouSure">
            <h2>Are you sure to refund?</h2>
            <div className="ending">
                <button className="btnbtntb" onClick={onCancel}>Cancel</button>
                <button className="btn-done" onClick={onRefund}>Refund</button>
            </div>
        </section>
    );
}

export default AdminAreYouSure;
