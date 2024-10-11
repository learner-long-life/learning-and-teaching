# Instruction Counting

We know that resources are limited in our everyday life: natural resources to support biodiverse life on earth,
the cognitive resources of time and attention, and emotional resources to be present for our loved ones.
While we can uncover more external resources through exploration or internal resources
through training, many of our important life decisions are how to allocate these resources for ourselves and
our communities. We may do a cost-benefit tradeoff analysis: this concert or movie is 3 hours of my life;
what's the likelihood I'll enjoy all of it? Or an opportunity cost: if I take this job or class, what else
would I be missing?

These are deep questions, and of course, you may wish to model these and others with computers.

It shouldn't surprise us that there are computational resources that are analogous to these, and we spend them
to run our algorithms on our data structures to solve our problems. Some of these resources are:

* Network bandwidth - anyone who has shared internet access or a WiFi router with neighbors and housemates knows there can be contention to download or access , or congestion due to network outages, unpredictable weather
* Electrical power - your power outlet has a limited number of plugs, your budget for your electrical bill is finite, your breaker box only supplies so much current before tripping, and the power capacity generated at your substation before it catches on fire has been designed and monitored by your power company.
* Quantum computing entanglement - this is a more exotic quantity, but a new paradigm for computing can take your computer's state through a non-classical path, using up a resource known as "entanglement", or the correlation between two (usually microscopic and subatomic) physical systems that must be generated and preserved. (Citation needed for entanglement)
* Graphics processing unit - in some modern computers, there's a special hardware unit that parallelizes operations that are useful for both graphics rendering, machine learning, and anything that uses matrix multiplication. Access to it is shared between all programs that request it from the operating system.
 
We would like to prime your brain, as you study data structures and algorithms, and as you work more
with computational hardware, to think of what resources you may using up, both grungy, detailed,
realistic kinds that cut into your budget for delicious sandwiches, and abstract, theoretical kinds
like the amount of emotional energy that folks are spending on presidential elections and
artificial intelligence startups.

When we are measuring computational resources, one important difference from thinking of more personal
resources is that we are very concerned with their usage as a function of some scale parameter,
which we call the `input size` and which is usually written as $n$. You can think of $n$ as the number
of items we are operating on (like number of possible ingredients in our $GetMaxSandwichOrder$ problem). 

This is a mindset of algorithm analysis pioneered by Donald Knuth,
who professed it as his chief research interest and developed it through his famous work,
The Art of Computer Programming. Most of the computational community has accepted this mindset,
which has the flavor of studying the long-term behaviors of problems as important while
abstracting away some short-term effects. We'll say more about this below, as well as other
mindsets that it does not cover.

What resources are missing from the list above? We are trolling you slightly, because we left the two
most important quantities for last. 

* Time, specifically CPU time
  * this is most closely associated with the algorithms and the number of steps they run
  * This is usually written as $ T(n) $, where $n$ is a parameter that usually tracks the input size to our computational problem.
* Space, specifically RAM (random access memory)
  * this is most closely associated with data structures, and the maximum number of memory cells (bytes) they need to complete the algorithm, including storing the output.
  * This is usually written as $ S(n) $, where $n$ is the same parameter as 

These, of course, are the stars, the central focus of this chapter.

* Exercise: What is a computational resource that we did not list above, but that you notice as you use computational devices?

## Time-Space Tradeoff

Another helpful mindset to consider one from physics. There are pairs of physical quantities that
experiments and theories have found to be linked in the following way:

It turns out, the precision that we know an object's momentum, often denoted `p` and equal to its mass times velocity, is
limited by the precision that we know its position, often denoted `x`. This is the famous Heisenberg uncertainy principle,
and by "know", we mean, of course, bounce photons off of and record whether they make it back to us at particular times (aka "science").
But wait, you say, I thought this was a computer science course.

$$ \Delta x \Delta p \ge \frac{h}{4 \pi} $$

We only mention it here so that you can enjoy the rich culture of memes such as 

## Instruction Types

As we work through algorithms, we will often use both pseudocode and source code in a real programming language (in our case, Java) 
which we classify into five types for the purpose of counting how much time resource.

1. Scope beginning and ending
2. Control-flow
3. Assignments, including memory loads and stores
4. Arithmetic and logical operations
5. Function calls
6. Returns from function calls

## Serial and Parallel

In an algorithm, there are some steps that must occur in sequence and others which can be parallelized.

Let's say the pseudocode for an algorithm $A$ contains subroutines (functions) called $B$ and $C$ that must be run in sequence.

$$
Algorithm A(x):
  Result1 \leftarrow B(x)
  Result2 \leftarrow C(x)  
$$

If two subroutines $A$ and $B$ of an algorithm must be run in sequence and take time $T_A(n)$ and $T_B(n)$,
then the 
