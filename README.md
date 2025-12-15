# Interactive Bézier Rope
Using the HTML Canvas, this project creates a Cubic Bézier Curve from scratch.

## Math
The curve is computed using the cubic Bézier equation:

B(t) = (1−t)³P0 + 3(1−t)²tP1 + 3(1−t)t²P2 + t³P3

Tangents are determined using the derivative of the curve.

## Physics
A basic model of spring-damping is used to control points P1 and P2:

acceleration = -k(position - target) - damping \* velocity

## Interaction
Mouse movement controls target position to create a rope effect.

No external libraries are used.
