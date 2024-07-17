import { Box, IconButton, Link } from "@mui/material";
import { FaGithubAlt, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineOpenInNew } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

export const contacts = [
  {
    link: "https://wa.me/5598991595038",
    label: "whatsapp",
    Icon: FaWhatsapp
  },
  {
    link: "mailto:iigorfelipe@gmail.com",
    label: "email",
    Icon: AiOutlineMail
  },
  {
    link: "https://github.com/iigorfelipe",
    label: "github",
    Icon: FaGithubAlt
  },
  {
    link: "https://www.linkedin.com/in/iigor-felipe/",
    label: "linkedin",
    Icon: FaLinkedin
  },
];

export const ContactsFooter = () => {

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',      
        borderRadius: '8px',
        bgcolor: '#03D69D',
        color: '#fff',
        flexDirection: 'column',
        gap: '1rem',
        p: '1rem',
        alignItems: 'center',
      }}
    >

      <Box
        sx={{
          display: 'flex',          
          justifyContent: 'center',
          width: '100%',
          gap: '1.2rem'
        }}
      >

        {
          contacts.map(({ label, link, Icon }) => (
            <IconButton
              key={label}
              href={link}
              target="_blank"
              sx={{
                height:'30px',
                width: '30px',
                m:'0px',
                p: '0px',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center'            
              }}
            >
              <Icon />
            </IconButton>
          ))
        }
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <Link
          href="https://github.com/iigorfelipe/woovi"
          target="_blank"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            gap: '2px',
            fontWeight: 600,
          }}
          >
          Gituhub do projeto
          <Box
            sx={{
              width: '10px',
              height: '10px',
              p: '0px',
            }}
          >
            <MdOutlineOpenInNew />
          </Box>
        </Link>
      </Box>
    </Box>
  );
};
