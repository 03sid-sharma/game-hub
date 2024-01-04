import {
  FaWindows,
  FaXbox,
  FaPlaystation,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { Platform } from "../hooks/useGames";
import { IconType } from "react-icons";

interface Props {
  platforms: Platform[];
}
const PlatformIconList = ({ platforms }: Props) => {
  const iconMap: {[key:string]: IconType} = {
    pc: FaWindows,
    xbox: FaXbox,
    playstation: FaPlaystation,
    nintendo: SiNintendo,
    ios: MdPhoneIphone,
    mac: FaApple,
    web: BsGlobe,
    android: FaAndroid,
    linux: FaLinux,
  };
  return (
    <HStack margin={1} color='gray.500'>
      {platforms.map((platform) => (
        <Icon key={platform.id} as={iconMap[platform.slug]}/>
      ))}
    </HStack>
  );
};

export default PlatformIconList;
