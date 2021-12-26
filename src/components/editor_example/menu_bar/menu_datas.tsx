import {
    AddIcon,
    ChevronRightIcon,
    EditIcon,
    DeleteIcon,
    DragHandleIcon,
    SunIcon,
    CheckIcon
} from '@chakra-ui/icons'

import {
    AiOutlineContacts,
    AiOutlineException,
    AiOutlineFolderOpen, AiOutlineProfile
} from 'react-icons/ai'

import {
    BiPaste
} from 'react-icons/bi'

import {
    FiBook,
    FiHelpCircle,
    FiRefreshCcw,
    FiRefreshCw,
    FiVideo,
    FiYoutube
} from 'react-icons/fi'

import {
    FaRegCopy,
    FaRegSave
} from 'react-icons/fa'

import {
    MdPreview
} from 'react-icons/md'

export const menuDatas = [
    {
        name: "File",
        icon: <AiOutlineProfile />,
        childs: [
            {
                title: "Scene",
                childs: [
                    { name: "New Scene", command: "Ctrl + N", icon: <AddIcon /> },
                    { name: "Open Scene...", command: "Ctrl + O", icon: <AiOutlineFolderOpen /> },
                    { name: "Save Scene", command: "Ctrl + S", icon: <FaRegSave /> }
                ]
            },
            {
                title: "Assets",
                childs: [
                    { name: "Import", command: "Ctrl + I", icon: <ChevronRightIcon /> },
                    { name: "Export", icon: <ChevronRightIcon /> }
                ]
            }
        ]
    },
    {
        name: "Edit",
        icon: <EditIcon />,
        childs: [
            {
                title: "History",
                childs: [
                    { name: "Undo", command: "Ctrl + Z", icon: <FiRefreshCcw /> },
                    { name: "Redo", command: "Ctrl + Shift + Z", icon: <FiRefreshCw /> },
                    { name: "Clear history", icon: <DeleteIcon /> }
                ]
            },
            {
                title: "Clipboard",
                childs: [
                    { name: "Copy", command: "Ctrl + C", icon: <FaRegCopy /> },
                    { name: "Paste", command: "Ctrl + V", icon: <BiPaste /> }
                ]
            }
        ]
    },
    {
        name: "View",
        icon: <MdPreview />,
        childs: [
            {
                title: "Editor",
                childs: [
                    { id: 'grid', name: "Grid", icon: <CheckIcon /> },
                    { id: 'camera', name: "Camera Icon", icon: <CheckIcon /> },
                    { id: 'light', name: "Light Icon", icon: <CheckIcon /> }
                ]
            },
        ]
    },
    {
        name: "Add",
        icon: <SunIcon />,
        childs: [
            {
                title: "Basic",
                childs: [
                    { name: "Group", icon: <DragHandleIcon /> },
                    { name: "Camera", icon: <FiVideo /> }
                ]
            },
            {
                title: "Geometry Objects",
                childs: [
                    { name: "Box", icon: <ChevronRightIcon /> },
                    { name: "Circle", icon: <ChevronRightIcon /> },
                    { name: "Cylinder", icon: <ChevronRightIcon /> },
                    { name: "Dodecahedron", icon: <ChevronRightIcon /> },
                    { name: "Icosahedron", icon: <ChevronRightIcon /> },
                    { name: "Lathe", icon: <ChevronRightIcon /> },
                    { name: "Octahedron", icon: <ChevronRightIcon /> },
                    { name: "Plane", icon: <ChevronRightIcon /> },
                    { name: "Ring", icon: <ChevronRightIcon /> },
                    { name: "Sphere", icon: <ChevronRightIcon /> },
                    { name: "Sprite", icon: <ChevronRightIcon /> },
                    { name: "Tetrahedron", icon: <ChevronRightIcon /> },
                    { name: "Torus", icon: <ChevronRightIcon /> },
                    { name: "TorusKnot", icon: <ChevronRightIcon /> },
                    { name: "Tube", icon: <ChevronRightIcon /> }
                ]
            },
            {
                title: "Light",
                childs: [
                    { name: "Ambient Light", icon: <SunIcon /> },
                    { name: "Directional Light", icon: <SunIcon /> },
                    { name: "Hemisphere Light", icon: <SunIcon /> },
                    { name: "Point Light", icon: <SunIcon /> },
                    { name: "Spot Light", icon: <SunIcon /> }
                ]
            }
        ]
    },
    {
        name: "Help",
        icon: <FiHelpCircle />,
        childs: [
            {
                title: "Editor",
                childs: [
                    { name: "Contract", icon: <AiOutlineException /> },
                    { name: "About", icon: <AiOutlineContacts /> }
                ]
            },
            {
                title: "Developer",
                childs: [
                    { name: "Tutorial", icon: <FiYoutube /> },
                    { name: "Document", icon: <FiBook /> }
                ]
            }
        ]
    },
]