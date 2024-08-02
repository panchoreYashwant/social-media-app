// UserProfile.js
import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, List } from "antd";
import axios from "axios";

const { Meta } = Card;
const { Title, Text } = Typography;

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`/users/${userId}`, { headers: { Authorization: token } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user", error);
      });
  }, [userId]);

  if (!user) return null;

  return (
    <Card>
      <Meta
        avatar={<Avatar src={`https://joeschmoe.io/api/v1/${user.username}`} />}
        title={<Title level={4}>{user.username}</Title>}
      />
      <div className="user-stats">
        <Text>Followers: {user.followers.length}</Text>
        <Text>Following: {user.following.length}</Text>
      </div>
    </Card>
  );
};

export default UserProfile;
