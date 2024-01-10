import React from "react";
import {
  Avatar,
  IconButton,
  Typography,
  CardContent,
  Card,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useLanguage } from "../../Config/Languages/useLanguage";
import { LanguageConfig } from "../../Config/Languages/LanguageProvider";
import { PhotoCamera, SaveOutlined } from "@mui/icons-material";

const SettingsMenu: React.FC<{
  username: string;
  phoneNumber: string;
  bio: string;
}> = ({ username, phoneNumber, bio }) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [profileImage, setProfileImage] = React.useState<string>(
    "/path/to/user/image.jpg"
  );
  const { language, FA, EN } = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>(() => {
    return language === "FA" ? (FA as LanguageConfig) : (EN as LanguageConfig);
  }, [EN, FA, language]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between m-[5rem] p-20 border-2 rounded-2xl border-blue-500 gap-4 bg-slate-700 bg-opacity-90">
      <Card className="max-w-xs mx-auto h-[400px] w-[300px] flex items-start justify-center gap-5">
        <CardContent className="flex flex-col items-center p-4">
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            id="icon-button-file"
            style={{ display: "none" }}
          />
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => setEditing(!editing)}
            sx={{
              marginTop: "auto",
            }}
          >
            {!editing ? <EditIcon /> : <SaveOutlined />}
          </IconButton>

          <Avatar
            alt={username}
            src={profileImage}
            sx={{ width: "100px", height: "100px", marginBottom: 2 }}
            variant="rounded"
          />
          {editing && (
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          )}
          <div className="w-full flex justify-between items-center mb-2 gap-3">
            {!editing ? (
              <Typography variant="h6" component="div" className="font-bold">
                {username}
              </Typography>
            ) : (
              <TextField
                label={languageConfig.forms.username}
                color={`primary`}
                defaultValue={username}
              />
            )}
          </div>

          {!editing ? (
            <Typography variant="body2" color="text.secondary">
              {phoneNumber}
            </Typography>
          ) : (
            <TextField
              label={languageConfig.forms.phone}
              color={`primary`}
              defaultValue={phoneNumber}
            />
          )}
          {!editing ? (
            <Typography variant="body1" color="text.secondary">
              {bio}
            </Typography>
          ) : (
            <TextField
              label={languageConfig.bio}
              color={`primary`}
              defaultValue={bio}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsMenu;
