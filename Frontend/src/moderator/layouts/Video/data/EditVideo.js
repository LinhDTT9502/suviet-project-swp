import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditVideo({ data }) {
	const videoID = useParams();
	const pr = videoID.videoID;
	const baseUrl = `http://localhost:8080/api/videos/update-video/`;

	const location = useLocation();
	const props = location.state;
	const [ID, setID] = useState('');
	const [video, setVideo] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [periodName, setPeriodName] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setID(props.videoID);
		setVideo(props.video);
		setTitle(props.title);
		setDescription(props.description);
		setPeriodName(props.periodName)
	},[]
	)

	// const handleVideoChange = (e) => {
	// 	const file = e.target.files[0];
	// 	setVideoFile(file);
	//   };
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const videos = { ID, video, title, description, periodName};
		fetch(baseUrl + pr, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
			},
			body: JSON.stringify(videos)
		})
			.then((res) => {
				// alert('Update successfully!');
				toast.success('Cập nhật thành công!');
				navigate('/moderator/video');
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<div className='item'>
		<form className="edit-container" onSubmit={handleSubmit}>
			<div className="edit-form">
				<div className="form-title">
					<h2>Cập Nhật Video</h2>
				</div>
				<div className="form-body">
					<div className="form-group">
						<TextField
							fullWidth id="filled-basic" label="ID" variant="filled" value={ID} disabled />
					</div>
					{/* <div className="form-group">
						<label>Choose Video File</label>
						<input type="file" onChange={handleVideoChange} accept="video/*" />
					</div> */}
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Video"
							variant="outlined"
							value={video}
							onChange={(e) => setVideo(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Tiêu Đề"
							variant="outlined"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<TextField
							fullWidth
							id="filled-basic"
							label="Mô Tả"
							variant="outlined"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							multiline
							rows={10}
						/>
					</div>
                    <div className="form-group">
						<TextField
						fullWidth
							id="filled-basic"
							label="Thời Kì"
							variant="outlined"
							value={periodName}
							onChange={(e) => setPeriodName(e.target.value.split(','))}
							required
						/>
					</div>
					<div className="form-group">
						<div className="update-btn">
							<Button variant="contained" color="success" type="submit">
								Cập Nhật
							</Button>
						</div>
						<div className="cancel-btn">
							<Link to="/moderator/character">
								<Button variant="contained" color="error">
									Hủy Bỏ
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</form>
        </div>
	)
}

export default EditVideo;
