import React, { createContext, useState, useMemo } from 'react';

// Create the Context
export const AssignmentsContext = createContext();

// Create the Provider component using function declaration
export function AssignmentsProvider({ children }) {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Major Depressive Disorder',
      studentQuestions: 10,
      status: 'Not started',
      releaseDate: '23/9/2024',
      closeDate: '23/10/2024',
    },
    {
      id: 2,
      title: 'Generalized Anxiety Disorder',
      studentQuestions: 10,
      status: 'In progress',
      releaseDate: '23/7/2024',
      closeDate: '23/8/2024',
    },
    {
      id: 3,
      title: 'Schizophrenia',
      studentQuestions: 10,
      status: 'Completed',
      releaseDate: '23/9/2023',
      closeDate: '23/10/2023',
    },
    {
      id: 4,
      title: 'Bipolar Disorder',
      studentQuestions: 10,
      status: 'Completed',
      releaseDate: '23/9/2022',
      closeDate: '23/10/2022',
    },
  ]);

  // Function to add a new assignment
  const addAssignment = (assignment) => {
    setAssignments((prevAssignments) => [
      ...prevAssignments,
      {
        ...assignment,
        id: prevAssignments.length + 1, // Fixed spacing and added commas
      },
    ]);
  };

  // Function to update an existing assignment
  const updateAssignment = (id, updatedFields) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id ? { ...assignment, ...updatedFields } : assignment,
      ),
    );
  };

  // Function to delete an assignment
  const deleteAssignment = (id) => {
    setAssignments((prevAssignments) =>
      prevAssignments.filter((assignment) => assignment.id !== id),
    );
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      assignments,
      addAssignment,
      updateAssignment,
      deleteAssignment,
    }),
    [assignments], // Added commas and proper spacing
  );

  return (
    <AssignmentsContext.Provider value={contextValue}>
      {children}
    </AssignmentsContext.Provider>
  );
}
