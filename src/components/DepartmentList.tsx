import React, { useState } from 'react';
import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Checkbox,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface Department {
    department: string;
    sub_departments: string[];
}

const data: Department[] = [
    {
        department: 'Engineering',
        sub_departments: ['IT', 'CSE', 'ECE', 'EEE', 'CSIT', 'MAE', 'Robotics'],
    },
    {
        department: 'MBA',
        sub_departments: ['Finance', 'Operations', 'Human Resources', 'Marketing', 'Computers'],
    },
];

const DepartmentList: React.FC = () => {
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [openDepartments, setOpenDepartments] = useState<string[]>([]);

    const handleToggleDepartment = (department: string) => () => {
        const currentIndex = selectedDepartments.indexOf(department);
        const newSelectedDepartments = [...selectedDepartments];

        if (currentIndex === -1) {
            newSelectedDepartments.push(department);
        } else {
            newSelectedDepartments.splice(currentIndex, 1);
        }

        setSelectedDepartments(newSelectedDepartments);
    };

    const handleClickDepartment = (department: string) => () => {
        const currentIndex = openDepartments.indexOf(department);
        const newOpenDepartments = [...openDepartments];

        if (currentIndex === -1) {
            newOpenDepartments.push(department);
        } else {
            newOpenDepartments.splice(currentIndex, 1);
        }

        setOpenDepartments(newOpenDepartments);
    };

    const isDepartmentSelected = (department: Department) =>
        selectedDepartments.includes(department.department);

    const areAllSubDepartmentsSelected = (subDepartments: string[]) =>
        subDepartments.every((subDepartment) =>
            selectedDepartments.includes(subDepartment)
        );

    const handleToggleAllSubDepartments = (department: Department) => () => {
        if (areAllSubDepartmentsSelected(department.sub_departments)) {
            setSelectedDepartments(
                selectedDepartments.filter(
                    (dep) => !department.sub_departments.includes(dep)
                )
            );
        } else {
            setSelectedDepartments([
                ...new Set([...selectedDepartments, ...department.sub_departments]),
            ]);
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Departments List</h1>
            <List>
                {data.map((departmentObj) => (
                    <div key={departmentObj.department}>
                        <ListItemButton onClick={handleClickDepartment(departmentObj.department)}>
                            <Checkbox
                                checked={isDepartmentSelected(departmentObj)}
                                indeterminate={
                                    areAllSubDepartmentsSelected(departmentObj.sub_departments) &&
                                    selectedDepartments.some((dep) =>
                                        departmentObj.sub_departments.includes(dep)
                                    )
                                }
                                onClick={handleToggleAllSubDepartments(departmentObj)}
                            />
                            <ListItemText primary={departmentObj.department} />
                            {openDepartments.includes(departmentObj.department) ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
                        </ListItemButton>
                        <Collapse in={openDepartments.includes(departmentObj.department)}>
                            <List>
                                {departmentObj.sub_departments.map((subDepartment) => (
                                    <ListItemButton
                                        key={subDepartment}
                                        sx={{ pl: 4 }}
                                        onClick={handleToggleDepartment(subDepartment)}
                                    >
                                        <Checkbox
                                            checked={selectedDepartments.includes(subDepartment)}
                                        />
                                        <ListItemText primary={subDepartment} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
        </>
    );
};

export default DepartmentList;