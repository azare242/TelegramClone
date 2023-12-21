package config

import "github.com/spf13/viper"

type Config struct {
	Database  DBConfig  `mapstructure:"database"`
	Server ServerConfig `mapstructure:"server"`
}

type ServerConfig struct {
	Port int `mapstructure:"port"`
	Address string `mapstructure:"address"`
	TokenKey string `mapstructure:"tokenKey"`
}

type DBConfig struct {
	Port     int    `mapstructure:"port"`
	Addr     string `mapstructure:"address"`
	DBName   string `mapstructure:"dbname"`
	User     string `mapstructure:"user"`
	Password string `mapstructure:"password"`
}

func LoadConfig() (*Config, error) {
	viper.AddConfigPath("./configs")
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")

	err := viper.ReadInConfig()
	if err != nil {
		return &Config{}, err
	}

	var conf Config
	err = viper.Unmarshal(&conf)
	if err != nil {
		return &Config{}, err
	}

	return &conf, nil
}
