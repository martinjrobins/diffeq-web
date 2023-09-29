import { Box, Typography } from "@mui/material";
import Latex from 'react-latex';

const Help = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Typography variant="h6" color={'textPrimary'}>
        Help
      </Typography>
      <p>The code above defines a <a href="https://en.wikipedia.org/wiki/Differential-algebraic_system_of_equations">differential-algebraic system of equations (DAE)</a> of the form <Latex>{"$F(u, \\dot{u}, t) = G(u, t)$"}</Latex> where <Latex>$u$</Latex> is the vector of state variables, <Latex>{"$\\dot{u}$"}</Latex> is the vector of state derivatives, and <Latex>$t$</Latex> is the time variable.</p>
      <p>The first line "in = [r, k]" labels the parameter inputs (which you can adjust via the sliders on the top right)</p>
      <p>The remaining lines define a series of scalars or vectors. Some names are required to fully define the system, these are "u", "dudt", "F", "G", and "out", the remainder are intermediate variables used to define the system. A variable must be defined before it is used in an equation for another variable.</p>
      <p>for example:</p>
      <ul>
        <li>"{"r { 1 }"}" is a scalar with value 1</li>
        <li>"{"u_i { y = 0.1, z = 0 }"}" defines the state vector with a single dimension indexed by "i", it has two elements labelled "y" and "z", which are given values 0.1 and 0</li>
        <li>"{"out_i { y }"}" defines the output vector (shown in the plot to the right). This vector only has one element with a value "y" (defined previously as the first element of the state vector).</li>
      </ul>
      <p>Try to change the equations solved and then hit the save button in the top left hand corner of your screen to compile the system. If there are no errors you will be able to adjust the input paramters via the sliders on the top right, and see the solution of your DAE system in the plot on the right. If you need to ajust the time duration to solve the system over, use the "max time" input field below the sliders</p>
      <p>For more information, please contact the author of this page, Martin Robinson (<a href="https://github.com/martinjrobins">github</a>, <a href="mailto:martinjrobins@gmail.com">email</a>).</p>
      
    </Box>
  );
}

export default Help;